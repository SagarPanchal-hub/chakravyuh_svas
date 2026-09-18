import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const CodeBlock = ({ code, language = "python" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative card-cyber overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-foreground leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const sections = [
  {
    step: "01",
    title: "Environment Setup",
    description: "Pehle apna Python environment aur zaroori libraries install karein.",
    code: `# Virtual environment banayein
python -m venv suraksha-env
source suraksha-env/bin/activate  # Linux/Mac
# suraksha-env\\Scripts\\activate   # Windows

# Dependencies install karein
pip install torch torch-geometric
pip install flwr[simulation]      # Flower FL framework
pip install fastapi uvicorn
pip install liboqs-python          # Post-Quantum Crypto
pip install shap matplotlib
pip install pandas numpy scikit-learn`,
  },
  {
    step: "02",
    title: "PaySim Data Pipeline",
    description: "PaySim dataset ko download karein aur Graph format mein convert karein.",
    code: `import pandas as pd
import torch
from torch_geometric.data import Data

# PaySim CSV load karein
df = pd.read_csv('PS_20174392719_1491204167654_log.csv')

# Sirf TRANSFER aur CASH_OUT transactions lein (fraud yahan hota hai)
df = df[df['type'].isin(['TRANSFER', 'CASH_OUT'])]

# Accounts ko unique IDs dein
accounts = pd.concat([df['nameOrig'], df['nameDest']]).unique()
account_map = {name: idx for idx, name in enumerate(accounts)}

# Edge index banayein (sender -> receiver)
src = df['nameOrig'].map(account_map).values
dst = df['nameDest'].map(account_map).values
edge_index = torch.tensor([src, dst], dtype=torch.long)

# Node features (amount, balance, etc.)
# Edge features bhi add kar sakte hain
labels = torch.tensor(df['isFraud'].values, dtype=torch.float)

data = Data(x=node_features, edge_index=edge_index, y=labels)
print(f"Nodes: {data.num_nodes}, Edges: {data.num_edges}")`,
  },
  {
    step: "03",
    title: "GraphSAGE Model",
    description: "Graph Neural Network model banayein jo transaction patterns samjhe.",
    code: `import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import SAGEConv

class FraudGraphSAGE(nn.Module):
    def __init__(self, in_channels, hidden_channels=128):
        super().__init__()
        self.conv1 = SAGEConv(in_channels, hidden_channels)
        self.conv2 = SAGEConv(hidden_channels, 64)
        self.classifier = nn.Linear(64, 1)
        self.dropout = nn.Dropout(0.3)

    def forward(self, x, edge_index):
        # Layer 1: Padosiyon se jankari lena
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.dropout(x)

        # Layer 2: Deep patterns samajhna
        x = self.conv2(x, edge_index)
        x = F.relu(x)

        # Final: Fraud ya nahi?
        x = self.classifier(x)
        return torch.sigmoid(x)

model = FraudGraphSAGE(in_channels=num_features)
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.BCELoss()`,
  },
  {
    step: "04",
    title: "Flower Federated Learning",
    description: "Banks ke beech privacy-preserving collaboration setup karein.",
    code: `import flwr as fl
from flwr.client import ClientApp, NumPyClient
from flwr.server import ServerApp

# Har bank ka client
class BankClient(NumPyClient):
    def __init__(self, model, train_data):
        self.model = model
        self.train_data = train_data

    def get_parameters(self, config):
        return [p.detach().numpy() for p in self.model.parameters()]

    def fit(self, parameters, config):
        # Server se weights lein
        for p, new_p in zip(self.model.parameters(), parameters):
            p.data = torch.tensor(new_p)

        # Local training
        self.model.train()
        for epoch in range(5):
            optimizer.zero_grad()
            out = self.model(self.train_data.x, self.train_data.edge_index)
            loss = criterion(out.squeeze(), self.train_data.y)
            loss.backward()
            optimizer.step()

        return self.get_parameters({}), len(self.train_data.y), {}

    def evaluate(self, parameters, config):
        # Evaluate model accuracy
        return float(loss), len(self.train_data.y), {"accuracy": acc}

# Server start karein
fl.server.start_server(
    server_address="0.0.0.0:8080",
    config=fl.server.ServerConfig(num_rounds=10),
)`,
  },
  {
    step: "05",
    title: "Post-Quantum Cryptography",
    description: "Quantum-resistant encryption se communication secure karein.",
    code: `import oqs

# Kyber (ML-KEM) - Key Encapsulation
kem = oqs.KeyEncapsulation("Kyber512")

# Server: Public/Private key pair banayein
public_key = kem.generate_keypair()

# Bank: Shared secret generate karein
ciphertext, shared_secret_bank = kem.encap_secret(public_key)

# Server: Shared secret recover karein
shared_secret_server = kem.decap_secret(ciphertext)

# Ab dono ke paas same secret hai - AES encryption ke liye!
assert shared_secret_bank == shared_secret_server

# Dilithium (ML-DSA) - Digital Signatures
sig = oqs.Signature("Dilithium2")
signer_public_key = sig.generate_keypair()
message = b"federated_model_update_round_5"
signature = sig.sign(message)

# Verify: Kya yah update asli bank se aaya?
is_valid = sig.verify(message, signature, signer_public_key)
print(f"Signature valid: {is_valid}")  # True`,
  },
  {
    step: "06",
    title: "FastAPI Dashboard Backend",
    description: "Dashboard ke liye API endpoints banayein.",
    code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Suraksha-Chain API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/transactions")
async def get_transactions():
    """Live transactions with risk scores"""
    return {"transactions": get_live_feed()}

@app.get("/api/model-metrics")
async def model_metrics():
    """GraphSAGE model performance"""
    return {
        "precision": 0.987,
        "recall": 0.961,
        "f1_score": 0.974,
        "auc_roc": 0.993
    }

@app.post("/api/predict")
async def predict_fraud(transaction: dict):
    """Real-time fraud prediction"""
    risk_score = model.predict(transaction)
    if risk_score > 0.9:
        block_transaction(transaction)  # Agentic AI
    return {"risk_score": risk_score}

# Run: uvicorn main:app --reload`,
  },
];

const ImplementationGuide = () => (
  <section id="guide" className="py-24 px-6 relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-foreground">Step-by-Step </span>
          <span className="text-neon-green" style={{ textShadow: "0 0 10px hsl(142 76% 50% / 0.6)" }}>
            Implementation Guide
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Har step ka code diya gaya hai — copy karein aur turant shuru karein
        </p>
      </motion.div>

      <div className="space-y-12">
        {sections.map((section, i) => (
          <motion.div
            key={section.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl font-black text-neon-cyan/20 font-mono">{section.step}</span>
              <div>
                <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
            <CodeBlock code={section.code} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImplementationGuide;
