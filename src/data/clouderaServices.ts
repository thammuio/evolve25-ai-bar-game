export interface ClouderaService {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const clouderaServices: ClouderaService[] = [
  {
    id: "1",
    name: "Apache Hadoop",
    description: "Distributed storage and processing framework for big data",
    category: "Core Platform"
  },
  {
    id: "2",
    name: "Apache Spark",
    description: "Fast, general-purpose distributed computing system",
    category: "Analytics"
  },
  {
    id: "3",
    name: "Apache Kafka",
    description: "Distributed event streaming platform for real-time data",
    category: "Data Streaming"
  },
  {
    id: "4",
    name: "Apache HBase",
    description: "Distributed, scalable NoSQL database built on Hadoop",
    category: "Database"
  },
  {
    id: "5",
    name: "Apache Hive",
    description: "Data warehouse software for SQL-like queries on big data",
    category: "Data Warehouse"
  },
  {
    id: "6",
    name: "Apache Impala",
    description: "High-performance SQL engine for interactive analytics",
    category: "Analytics"
  },
  {
    id: "7",
    name: "Cloudera Machine Learning",
    description: "End-to-end machine learning platform for data science teams",
    category: "ML/AI"
  },
  {
    id: "8",
    name: "Apache Kudu",
    description: "Fast analytics on fast data with real-time ingest",
    category: "Storage"
  }
];