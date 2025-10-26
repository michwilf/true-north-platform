# 🔄 MongoDB Migration - Complete TODO List

## 📊 **Current State Analysis**

### **SQLite Databases Currently in Use:**

```
backend/data/
├── portfolio.db (24 KB)          ← Portfolio positions & trades
├── alerts.db (12 KB)             ← System alerts
└── trader_following.db (20 KB)   ← Trader tracking & trades
```

### **Files Using SQLite:**

1. **`backend/core/portfolio/tracker.py`** (PortfolioTracker)
   - Manages: positions, trades, portfolio_metrics tables
   - ~500 lines with 9 sqlite3 imports/connections

2. **`backend/core/monitoring/system.py`** (AlertDatabase)
   - Manages: alerts table
   - ~100 lines with 5 sqlite3 imports/connections

3. **`backend/core/trader_following/system.py`** (TraderDatabase)
   - Manages: traders, trades tables
   - ~200 lines with 10 sqlite3 imports/connections

---

## ✅ **MONGODB MIGRATION TODO LIST**

### **Phase 1: Setup & Infrastructure** 🔧

- [ ] **1.1** Install MongoDB Python driver
  ```bash
  pip install pymongo motor  # motor for async support
  ```

- [ ] **1.2** Create MongoDB configuration file
  ```python
  # backend/config/mongodb.py
  - MongoDB connection string
  - Database name: "true_north_trading"
  - Collections: portfolio_positions, portfolio_trades, portfolio_metrics, alerts, traders, trader_trades
  - Connection pooling settings
  ```

- [ ] **1.3** Create MongoDB connection manager
  ```python
  # backend/core/database/mongodb_manager.py
  - Singleton connection class
  - Connection pooling
  - Error handling & retries
  - Health check methods
  ```

- [ ] **1.4** Add MongoDB connection to environment variables
  ```bash
  # backend/.env
  MONGODB_URI=mongodb+srv://mikeywilfert_db_user:5Srlrkz1jjV0eGTy@true-north-data.kuj9zd3.mongodb.net/?appName=true-north-data
  MONGODB_DATABASE=true_north_trading
  ```

---

### **Phase 2: Portfolio System Migration** 💼

- [ ] **2.1** Create MongoDB Portfolio schema/models
  ```python
  # backend/core/database/schemas/portfolio.py
  - PositionSchema (replaces positions table)
  - TradeSchema (replaces trades table)
  - PortfolioMetricsSchema (replaces portfolio_metrics table)
  ```

- [ ] **2.2** Migrate PortfolioTracker class
  ```python
  # backend/core/portfolio/tracker.py
  - Remove: import sqlite3, self.db_path
  - Add: MongoDB client, async operations
  - Update: _init_database() → _init_mongodb()
  - Update: add_position() → use insert_one()
  - Update: remove_position() → use delete_one()
  - Update: record_trade() → use insert_one()
  - Update: get_positions() → use find()
  - Update: get_trade_history() → use find() with filters
  - Update: calculate_performance() → use aggregation pipeline
  - Update: seed_demo_data() → use insert_many()
  ```

- [ ] **2.3** Migrate existing portfolio.db data
  ```python
  # scripts/migrate_portfolio_to_mongo.py
  - Read from portfolio.db (SQLite)
  - Transform data format
  - Insert into MongoDB collections
  - Verify data integrity
  ```

- [ ] **2.4** Update portfolio API endpoints
  ```python
  # backend/api/endpoints/portfolio.py
  - Ensure all endpoints work with new MongoDB backend
  - Test CRUD operations
  ```

---

### **Phase 3: Monitoring System Migration** 🚨

- [ ] **3.1** Create MongoDB Alert schema
  ```python
  # backend/core/database/schemas/alerts.py
  - AlertSchema (replaces alerts table)
  - Index on: timestamp, severity, symbol, resolved
  ```

- [ ] **3.2** Migrate AlertDatabase class
  ```python
  # backend/core/monitoring/system.py
  - Remove: import sqlite3, self.db_path
  - Add: MongoDB client
  - Update: _init_database() → _init_mongodb()
  - Update: save_alert() → use insert_one()
  - Update: get_recent_alerts() → use find() with date filter
  - Update: acknowledge_alert() → use update_one()
  - Update: resolve_alert() → use update_one()
  ```

- [ ] **3.3** Migrate existing alerts.db data
  ```python
  # scripts/migrate_alerts_to_mongo.py
  - Read from alerts.db (SQLite)
  - Transform data format
  - Insert into MongoDB
  ```

- [ ] **3.4** Update monitoring API endpoints
  ```python
  # backend/api/endpoints/monitoring.py
  - Test alert creation/retrieval
  - Verify filtering works
  ```

---

### **Phase 4: Trader Following System Migration** 👤

- [ ] **4.1** Create MongoDB Trader schemas
  ```python
  # backend/core/database/schemas/traders.py
  - TraderProfileSchema (replaces traders table)
  - TraderTradeSchema (replaces trades table)
  - Index on: trader_id, platform, timestamp
  ```

- [ ] **4.2** Migrate TraderDatabase class
  ```python
  # backend/core/trader_following/system.py
  - Remove: import sqlite3, self.db_path
  - Add: MongoDB client
  - Update: _init_database() → _init_mongodb()
  - Update: add_trader() → use insert_one() or update_one()
  - Update: add_trade() → use insert_one()
  - Update: get_traders() → use find()
  - Update: get_recent_trades() → use find() with date filter
  - Update: get_trader_by_id() → use find_one()
  ```

- [ ] **4.3** Migrate existing trader_following.db data
  ```python
  # scripts/migrate_traders_to_mongo.py
  - Read from trader_following.db (SQLite)
  - Transform data format
  - Insert into MongoDB
  - Verify relationships
  ```

- [ ] **4.4** Update trader API endpoints
  ```python
  # backend/api/endpoints/traders.py
  - Test trader CRUD operations
  - Verify trade history retrieval
  ```

---

### **Phase 5: Discovery & Opportunities** 🔍

- [ ] **5.1** Create MongoDB Opportunity schema
  ```python
  # backend/core/database/schemas/opportunities.py
  - OpportunitySchema
  - Index on: discovered_at, score, symbol
  ```

- [ ] **5.2** Migrate discovered_watchlist.json
  ```python
  # backend/core/discovery/engine.py
  - Remove: JSON file storage
  - Add: MongoDB storage for opportunities
  - Update: _save_opportunities() → use insert_many()
  - Update: get_opportunities() → use find()
  ```

- [ ] **5.3** Create migration script
  ```python
  # scripts/migrate_opportunities_to_mongo.py
  - Read from discovered_watchlist.json
  - Insert into MongoDB
  ```

---

### **Phase 6: Testing & Validation** ✅

- [ ] **6.1** Unit tests for MongoDB connections
  ```python
  # tests/unit/test_mongodb_connection.py
  - Test connection establishment
  - Test error handling
  - Test connection pooling
  ```

- [ ] **6.2** Integration tests for each system
  ```python
  # tests/integration/
  - test_portfolio_mongodb.py (CRUD operations)
  - test_alerts_mongodb.py (alert lifecycle)
  - test_traders_mongodb.py (trader tracking)
  ```

- [ ] **6.3** Data integrity verification
  ```python
  # scripts/verify_migration.py
  - Compare SQLite row counts vs MongoDB document counts
  - Verify data formats
  - Check indexes created
  ```

- [ ] **6.4** Performance testing
  ```python
  # tests/performance/
  - Compare query speeds SQLite vs MongoDB
  - Test aggregation pipelines
  - Load testing
  ```

---

### **Phase 7: Deployment & Cleanup** 🚀

- [ ] **7.1** Update requirements.txt
  ```
  pymongo>=4.6.0
  motor>=3.3.0  # async MongoDB driver
  ```

- [ ] **7.2** Update Docker configuration
  ```yaml
  # docker-compose.yml
  - Remove SQLite volume mounts
  - Add MongoDB environment variables
  ```

- [ ] **7.3** Update deployment documentation
  ```markdown
  # docs/MONGODB_SETUP.md
  - Connection string format
  - Database setup instructions
  - Migration guide
  ```

- [ ] **7.4** Backup SQLite databases
  ```bash
  # Backup before removing
  mkdir -p backend/data/sqlite_backup
  mv backend/data/*.db backend/data/sqlite_backup/
  ```

- [ ] **7.5** Remove SQLite dependencies
  ```python
  # Remove from all files:
  - import sqlite3
  - .db_path references
  - sqlite3.connect() calls
  ```

---

### **Phase 8: MongoDB Optimization** ⚡

- [ ] **8.1** Create indexes
  ```python
  # backend/core/database/indexes.py
  - Portfolio: symbol (unique), entry_date
  - Trades: symbol, timestamp
  - Alerts: timestamp, severity, resolved
  - Traders: trader_id (unique), platform
  - Trader Trades: trader_id, timestamp, symbol
  ```

- [ ] **8.2** Setup aggregation pipelines
  ```python
  # backend/core/database/aggregations.py
  - Portfolio performance calculation
  - Trader performance metrics
  - Alert statistics
  ```

- [ ] **8.3** Configure TTL indexes
  ```python
  # Auto-delete old data
  - Old alerts (90 days)
  - Closed trades (1 year)
  ```

- [ ] **8.4** Setup backup strategy
  ```python
  # scripts/backup_mongodb.py
  - Automated daily backups
  - Restore procedures
  ```

---

## 📋 **Migration Checklist Summary**

### **Critical Path:**
1. ✅ Setup MongoDB connection (Phase 1)
2. ✅ Migrate Portfolio system (Phase 2)
3. ✅ Migrate Monitoring system (Phase 3)
4. ✅ Migrate Trader system (Phase 4)
5. ✅ Test everything (Phase 6)
6. ✅ Deploy (Phase 7)

### **Nice-to-Have:**
- Phase 5 (Opportunities)
- Phase 8 (Optimization)

---

## 🔢 **Estimated Effort**

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| Phase 1: Setup | 4 tasks | 2 hours |
| Phase 2: Portfolio | 4 tasks | 4 hours |
| Phase 3: Monitoring | 4 tasks | 2 hours |
| Phase 4: Traders | 4 tasks | 3 hours |
| Phase 5: Discovery | 3 tasks | 2 hours |
| Phase 6: Testing | 4 tasks | 3 hours |
| Phase 7: Deployment | 5 tasks | 2 hours |
| Phase 8: Optimization | 4 tasks | 2 hours |
| **TOTAL** | **32 tasks** | **20 hours** |

---

## 🎯 **Quick Start Priority**

### **Must Do First (Critical):**
1. [ ] Install pymongo + motor
2. [ ] Create MongoDB config
3. [ ] Migrate PortfolioTracker
4. [ ] Migrate AlertDatabase
5. [ ] Migrate TraderDatabase
6. [ ] Test all API endpoints

### **Can Do Later:**
- Discovery/Opportunities migration
- Performance optimization
- Advanced indexing
- Backup automation

---

## ⚠️ **Important Notes**

1. **Connection String Security:**
   - ✅ Move connection string to .env
   - ❌ Never commit connection string to git
   - ✅ Use environment variables in production

2. **Data Migration:**
   - ✅ Backup SQLite databases before migration
   - ✅ Verify data integrity after migration
   - ✅ Keep SQLite as backup for 30 days

3. **Testing:**
   - ✅ Test locally first
   - ✅ Test on staging environment
   - ✅ Then deploy to production

4. **Rollback Plan:**
   - Keep SQLite code in git history
   - Keep database backups
   - Have rollback script ready

---

## 📊 **MongoDB Collections Structure**

```
Database: true_north_trading
│
├── portfolio_positions
│   ├── symbol (string, unique)
│   ├── shares (float)
│   ├── entry_price (float)
│   ├── entry_date (datetime)
│   └── last_updated (datetime)
│
├── portfolio_trades
│   ├── trade_id (ObjectId)
│   ├── symbol (string)
│   ├── action (string: BUY/SELL)
│   ├── shares (float)
│   ├── price (float)
│   ├── timestamp (datetime)
│   ├── pnl (float)
│   └── pnl_percent (float)
│
├── portfolio_metrics
│   ├── total_value (float)
│   ├── cash_balance (float)
│   ├── total_invested (float)
│   └── last_updated (datetime)
│
├── alerts
│   ├── alert_id (ObjectId)
│   ├── alert_type (string)
│   ├── severity (string)
│   ├── symbol (string)
│   ├── title (string)
│   ├── message (string)
│   ├── timestamp (datetime)
│   ├── data (object)
│   ├── channels (array)
│   ├── acknowledged (boolean)
│   └── resolved (boolean)
│
├── traders
│   ├── trader_id (string, unique)
│   ├── name (string)
│   ├── platform (string)
│   ├── username (string)
│   ├── win_rate (float)
│   ├── avg_return (float)
│   ├── total_followers (int)
│   ├── verified (boolean)
│   ├── primary_strategy (string)
│   ├── risk_level (string)
│   ├── confidence_score (float)
│   ├── auto_follow (boolean)
│   └── added_date (datetime)
│
└── trader_trades
    ├── trade_id (string)
    ├── trader_id (string, ref traders)
    ├── symbol (string)
    ├── trade_type (string)
    ├── entry_price (float)
    ├── entry_time (datetime)
    ├── exit_price (float)
    ├── exit_time (datetime)
    ├── pnl_percent (float)
    ├── is_closed (boolean)
    └── platform (string)
```

---

## 🚀 **Next Steps**

1. **Review this TODO list**
2. **Prioritize phases** (suggest: Phases 1-4, 6-7 first)
3. **Start with Phase 1** (setup infrastructure)
4. **Test each phase** before moving to next
5. **Deploy incrementally** (one system at a time)

---

**MongoDB Connection String:**
```
mongodb+srv://mikeywilfert_db_user:5Srlrkz1jjV0eGTy@true-north-data.kuj9zd3.mongodb.net/?appName=true-north-data
```

**Status:** ✅ **Ready to begin migration!**

Would you like me to start with Phase 1 (Setup & Infrastructure)?

