// src/components/pdf/CertificatePDF.jsx
import React from 'react';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from './certificateStyles';
import FrontPage from './CertificateFront';
import BackPage from './CertificateBack';

/**
 * 🎴 CERTIFICATE PDF (ID Card) - MAIN COMPONENT
 * Professional structure following industrial standards
 * - Separated concerns: Main, Front, Back, Styles
 * - Optimized layout with proper spacing
 * - Fixed margins and padding
 */

const CertificatePDF = ({ data }) => {
  console.log('🎴 CertificatePDF rendering with data:', {
    hasData: !!data,
    hasQRCode: !!data?.qrCode,
    welderName: data?.welderName,
    certificateNo: data?.certificateNo
  });

  if (!data) {
    console.error('❌ CertificatePDF: No data provided');
    return (
      <Document>
        <Page size={[242.65, 153]} style={styles.page}>
          <Text style={styles.fallbackText}>No certificate data available</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      {/* FRONT PAGE */}
      <FrontPage data={data} />
      
      {/* BACK PAGE */}
      <BackPage data={data} />
    </Document>
  );
};

export default CertificatePDF;
