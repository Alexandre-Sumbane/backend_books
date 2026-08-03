import path from 'path';
import express from 'express';

const staticfolderImages = express.static(
    path.resolve(__dirname, '..','..', 'infra', 'uploads', 'img', 'Covers')
    
);

const staticfolderPDFs = express.static(
    path.resolve(__dirname, '..', '..', 'infra', 'uploads', 'pdfs')
)

export {staticfolderImages, staticfolderPDFs}