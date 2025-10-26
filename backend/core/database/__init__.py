"""
Database module for MongoDB connection and management.
"""

from .mongodb_manager import MongoDBManager, get_mongodb_manager

__all__ = ["MongoDBManager", "get_mongodb_manager"]
