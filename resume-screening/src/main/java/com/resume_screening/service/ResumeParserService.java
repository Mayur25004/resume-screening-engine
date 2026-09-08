package com.resume_screening.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class ResumeParserService {

    public String extractText(String filePath) throws IOException {

        // Open the PDF file
        File file = new File(filePath);

        // Load the PDF
        try (PDDocument document = Loader.loadPDF(file)) {

            // Create a PDF text extractor
            PDFTextStripper stripper = new PDFTextStripper();

            // Extract and return the text
            return stripper.getText(document);
        }
    }
}