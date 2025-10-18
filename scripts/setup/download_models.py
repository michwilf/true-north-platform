#!/usr/bin/env python3
'''
Model Download Script for True North Trading Platform

Downloads and caches pre-trained models for:
- FinBERT (sentiment analysis)
- TimesFM (time series forecasting) 
- Chronos models (time series forecasting)
- Other finance-specific models
'''

import os
from pathlib import Path
from transformers import AutoTokenizer, AutoModel, pipeline
import torch

def download_finbert():
    '''Download FinBERT for financial sentiment analysis.'''
    print("📥 Downloading FinBERT...")
    try:
        model_name = "ProsusAI/finbert"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModel.from_pretrained(model_name)
        
        # Test the model
        classifier = pipeline("text-classification", 
                            model=model_name, 
                            tokenizer=model_name)
        
        # Test with sample text
        result = classifier("The company reported strong quarterly earnings.")
        print(f"✅ FinBERT test result: {result}")
        return True
    except Exception as e:
        print(f"❌ Error downloading FinBERT: {e}")
        return False

def download_chronos_models():
    '''Download Chronos time series models.'''
    print("📥 Downloading Chronos models...")
    try:
        from chronos import ChronosPipeline
        
        # Download small model first
        pipeline = ChronosPipeline.from_pretrained(
            "amazon/chronos-t5-small",
            device_map="auto" if torch.cuda.is_available() else "cpu",
            torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        )
        
        print("✅ Chronos-T5-Small downloaded successfully")
        return True
    except Exception as e:
        print(f"❌ Error downloading Chronos: {e}")
        return False

def download_timesfm():
    '''Download TimesFM model.'''
    print("📥 Downloading TimesFM...")
    try:
        # This will depend on the actual TimesFM installation
        # For now, just check if it's available
        import timesfm
        print("✅ TimesFM available")
        return True
    except ImportError:
        print("⚠️  TimesFM not available - install from GitHub")
        return False

def main():
    print("🤖 Downloading pre-trained models for True North Trading Platform")
    print("=" * 70)
    
    # Create models directory
    models_dir = Path("models")
    models_dir.mkdir(exist_ok=True)
    
    success_count = 0
    total_models = 3
    
    # Download models
    if download_finbert():
        success_count += 1
    
    if download_chronos_models():
        success_count += 1
        
    if download_timesfm():
        success_count += 1
    
    print(f"\n📊 Download Summary: {success_count}/{total_models} models downloaded successfully")
    
    if success_count == total_models:
        print("🎉 All models downloaded successfully!")
    else:
        print("⚠️  Some models failed to download. Check the logs above.")
    
    return success_count == total_models

if __name__ == "__main__":
    main()
