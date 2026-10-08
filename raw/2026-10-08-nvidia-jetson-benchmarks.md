---
url: https://developer.nvidia.com/embedded/jetson-benchmarks
title: Jetson Benchmarks | NVIDIA Developer
fetched: 2026-10-08
added_by: scout
source: S-b4886fea
---

 
 Jetson Benchmarks | NVIDIA Developer 
 Jetson Benchmarks
 Jetson is used to deploy a wide range of popular DNN models, optimized transformer models and ML frameworks to the edge with high performance inferencing, for tasks like real-time classification and object detection, pose estimation, semantic segmentation, and natural language processing (NLP). 
 MLPerf Inference Benchmarks
 The tables below show inferencing benchmarks from the NVIDIA Jetson submissions to the MLPerf Inference Edge category.
 NVIDIA® Jetson AGX Thor™ Benchmarking Results
 | 
 Model | 
 NVIDIA Jetson AGX Thor | 
 | 
 | 
 Max Concurrency 1 
(tokens/sec) | 
 Max Concurrency 8 
(tokens/sec) | 
 LLM | 
 Llama 3.1 8B | 
 41.3 | 
 150.8 | 
 Llama 3.3 70B | 
 4.7 | 
 12.6 | 
 Qwen 3 30B-A3B | 
 61 | 
 226.4 | 
 Qwen 3 32B | 
 13.19 | 
 79.1 | 
 Deepseek R1 7B | 
 41.32 | 
 304.8 | 
 Deepseek R1 32B | 
 13.31 | 
 82.6 | 
 VLM | 
 Qwen2.5-VL 3B | 
 71.7 | 
 356.86 | 
 Qwen2.5-VL 7B | 
 45 | 
 252 | 
 LLama 3.2 11B Vision | 
 26.31 | 
 69.63 | 
 These results were achieved with the NVIDIA Jetson AGX Thor Developer Kit running NVIDIA JetPack™ 7.0, NVIDIA CUDA® 13.0, and NVIDIA TensorRT™ 10.13. LLM and VLM benchmarks were performed using VLLM with ISL/OSL as 2048/128. 
 NOTE: Future software optimizations will deliver additional performance improvements.
 MLPerf Inference Benchmarks
 The tables below show inferencing benchmarks from the NVIDIA Jetson submissions to the MLPerf Inference Edge category.
 Jetson AGX Orin™ MLPerf v4.0 Results
 Model | 
 NVIDIA Jetson AGX Orin (TensorRT) | 
 | 
 Single Stream Latency (ms) | 
 Offline (Samples/s) | 
 LLM Summarization 
 GPT-J 6B
 | 
 10204.46 | 
 0.15 | 
 Image Generation 
 stable-diffusion-xl
 | 
 12941.92 | 
 0.08 | 
 Full Results can be found at v4.0 Results | MLCommons 
 These results were achieved with the NVIDIA Jetson AGX Orin Developer Kit running JetPack 5.1.1, TensorRT 9.0.1 and CUDA 11.4
 These MLPerf Results can be reproduced with the code in the following link: https://github.com/mlcommons/inference_results_v4.0/tree/main/closed/NVIDIA 
 Jetson AGX Orin and Jetson Orin NX MLPerf v3.1 Results
 Model | 
 NVIDIA Jetson AGX Orin (TensorRT) | 
 NVIDIA Orin MaxQ (TensorRT) | 
 NVIDIA Jetson Orin NX | 
 NVIDIA Jetson Orin NX MaxQ | 
 | 
 Single Stream Latency (ms) | 
 Offline (Samples/s) | 
 Multi Stream Latency(ms) | 
 Offline (Samples/s) | 
 System Power(W) | 
 Offline (Samples/s) | 
 Offline (Samples/s) | 
 System Power(W) | 
 Image Classification 
 ResNet | 
 0.64 | 
 6423.63 | 
 2.18 | 
 3526.29 | 
 23.57 | 
 2640.51 | 
 1681.87 | 
 14.95 | 
 Object Detection 
 Retinanet | 
 11.67 | 
 148.71 | 
 82.92 | 
 74.71 | 
 22.27 | 
 66.5 | 
 47.59 | 
 15.57 | 
 Medical Imaging 
3D-Unet-99.0 | 
 4371.46 | 
 0.51 | 
 N/A | 
 N/A | 
 N/A | 
 0.2 | 
 0.19 | 
 22.04 | 
 Speech-to-text 
RNN-T | 
 94.01 | 
 1169.98 | 
 N/A | 
 N/A | 
 N/A | 
 431.92 | 
 327.79 | 
 17.25 | 
 Natural Language Processing 
BERT | 
 5.71 | 
 553.69 | 
 N/A | 
 N/A | 
 N/A | 
 194.5 | 
 136.59 | 
 17.04 | 
 Full Results can be found at v3.1 Results | MLCommons 
 These results were achieved with the NVIDIA Jetson AGX Orin Developer Kit and Orin NX 16GB running JetPack 5.1.1, TensorRT 8.5.2 and CUDA 11.4
 A
 These MLPerf Results can be reproduced with the code in the following link: https://github.com/mlcommons/inference_results_v3.1/tree/main/closed/NVIDIA 
 Jetson AGX Orin Jetson Orin NX MLPerf v3.0 Results
 Model | 
 NVIDIA Jetson AGX Orin (TensorRT) | 
 NVIDIA Orin MaxQ (TensorRT) | 
 NVIDIA Jetson Orin NX | 
 | 
 Single Stream (Samples/s) | 
 Offline (Samples/s) | 
 Multi Stream (Samples/s) | 
 Offline (Samples/s) | 
 System Power(W) | 
 Offline (Samples/s) | 
 Image Classification 
 ResNet-50
 | 
 1538 | 
 6438.10 | 
 3686 | 
 3525.91 | 
 23.06 | 
 2517.99 | 
 Object Detection 
Retinanet
 | 
 51.57 | 
 92.40 | 
 60.00 | 
 34.6 | 
 22.4 | 
 36.14 | 
 Medical Imaging 
3D-Unet
 | 
 .26 | 
 .51 | 
 N/A | 
 3.28 | 
 28.64 | 
 .19 | 
 Speech-to-text 
RNN-T
 | 
 9.822 | 
 1170.23 | 
 N/A | 
 14472 | 
 25.64 | 
 405.27 | 
 Natural Language Processing 
BERT
 | 
 144.36 | 
 544.24 | 
 N/A | 
 3685.36 | 
 25.91 | 
 163.57 | 
 Steps to reproduce these results can be found at v3.0 Results | MLCommons 
 These results were achieved with the NVIDIA Jetson AGX Orin Developer Kit running a preview of TensorRT 8.5.0, and CUDA 11.4
 Note different configurations were used for single stream, offline and multistream. Reference the MLCommons page for more details
 Gen AI Benchmarks
 NVIDIA Jetson AI Lab is a collection of tutorials showing how to run optimized models on NVIDIA Jetson, including the latest generative AI and transformer models. These tutorials span a variety of model modalities like LLMs (for text), VLMs (for text and vision data), ViT (Vision Transformers), image generation, and ASR or TTS (for audio). 
 Large Language Models (LLM)
 Small Language Models (SLM)
 Vision Transformers (ViT)
 Riva
 Full Results can be found at Jetson AI Lab Benchmarks 
 Join now 

