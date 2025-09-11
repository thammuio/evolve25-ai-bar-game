export interface ClouderaService {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const clouderaServices: ClouderaService[] = [
  {
    id: "1",
    name: "Cloudera Open Data Lakehouse powered by Apache Iceberg",
    description: "Unified analytics powered by Apache Iceberg with REST Catalog and Lakehouse Optimizer",
    category: "Data Lakehouse"
  },
  {
    id: "2",
    name: "Spark and Airflow Orchestration for Data Pipelines",
    description: "Scalable Spark pipelines with autoscaling and Airflow-native orchestration",
    category: "Data Engineering"
  },
  {
    id: "3",
    name: "Cloudera DataFlow 2.0 with GenAI-Enabled Processors",
    description: "NiFi 2.0 with GenAI processors for low-code streaming and migration tooling",
    category: "Streaming & Integration"
  },
  {
    id: "4",
    name: "Cloudera Data Services (AI) in your data center",
    description: "Run AI securely in your data center with unified governance and compliance",
    category: "Private AI"
  },
  {
    id: "5",
    name: "Cloudera AI Studios - Agent Studio, RAG Studio, and AI App Builder",
    description: "Build task-oriented AI agents and RAG apps with low-code templates",
    category: "AI Development"
  },
  {
    id: "6",
    name: "Shared Data Experience (SDX) for Enterprise security & Governance Anywhere",
    description: "Cross-platform security, lineage, and Octopai-powered data governance",
    category: "Governance & Security"
  },
  {
    id: "7",
    name: "Cloudera AI Platform for Generative AI and Machine Learning at Scale",
    description: "Develop, deploy, and govern generative AI and predictive ML at scale",
    category: "AI & ML"
  },
  {
    id: "8",
    name: "Private AI Turnkey Infrastructure Solution (Cloudera + Dell + NVIDIA)",
    description: "Turnkey private AI: Dell servers + NVIDIA GPUs + Cloudera platform for secure, on-prem AI",
    category: "AI in a Box"
  }
];
