// src/components/pdf/CertificateFront.jsx
import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from './certificateStyles';

/**
 * 🎴 CERTIFICATE FRONT PAGE
 * Contains: Header, Photo, Inspector, Details, QR Code
 */

const FrontPage = ({ data }) => {
  const logoPath = '/iss-logo.png';
  const watermarkPath = '/iss_logo_fevicon.png';

  return (
    <Page size={[242.65, 153]} style={styles.page}>
      {/* Background Watermark */}
      <View style={styles.watermarkLayer}>
        <Image 
          src={watermarkPath} 
          style={styles.backgroundWatermark}
        />
      </View>
      
      <View style={styles.frontPage}>
        <View style={styles.innerBorder} />
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.cardNumberRow}>
            <Text style={styles.cardNumber}>
              {data.cardNo || `W.Q.T - ${data.certificateNo || 'N/A'}`}
            </Text>
            <View style={styles.logoContainer}>
              <Image 
                src={logoPath} 
                style={styles.headerLogo}
              />
            </View>
          </View>
          
          <View style={styles.companyInfo}>
            <Text style={styles.companyAddress}>
              P.O Box 11501, Dammam 34643, KSA
            </Text>
            <Text style={styles.companyAddress}>
              Ph: +966 822 7486 Fax: 966 8448833
            </Text>
            <Text style={styles.companyAddress}>
              Email: info@issksa.com
            </Text>
          </View>
        </View>
        
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Section: Photo & Inspector */}
          <View style={styles.leftSection}>
            <View style={styles.welderPhotoContainer}>
              {data.photoUrl ? (
                <Image src={data.photoUrl} style={styles.welderPhoto} />
              ) : (
                <View style={styles.welderPhoto}>
                  <Text style={styles.fallbackText}>Photo</Text>
                </View>
              )}
            </View>
            
            <View style={styles.inspectorSection}>
              <Text style={styles.inspectorLabel}>WELDING{'\n'}INSPECTOR</Text>
              <Text style={styles.inspectorName}>
                {data.inspectorName || 'N/A'}
              </Text>
              {data.cswipCertNo && data.cswipCertNo !== 'N/A' && (
                <Text style={styles.cswipCert}>
                  CSWIP Cert. No:{'\n'}{data.cswipCertNo}
                </Text>
              )}
              {data.signatureUrl && (
                <Image src={data.signatureUrl} style={styles.signatureImage} />
              )}
            </View>
          </View>
          
          {/* Center Section: Details */}
          <View style={styles.centerSection}>
            <Text style={styles.certificationText}>
              This is to certify that this person has been tested in accordance with the requirements of ASME SEC IX (EDITION-2020)
            </Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Welder Name</Text>
                <Text style={styles.detailColon}>:</Text>
                <Text style={styles.detailValue}>{data.welderName || 'N/A'}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Iqama/PP No</Text>
                <Text style={styles.detailColon}>:</Text>
                <Text style={styles.detailValue}>{data.iqamaPassport || 'N/A'}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Welder No.</Text>
                <Text style={styles.detailColon}>:</Text>
                <Text style={styles.detailValue}>{data.welderNo || 'N/A'}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Company</Text>
                <Text style={styles.detailColon}>:</Text>
                <Text style={styles.detailValue}>{data.company || 'N/A'}</Text>
              </View>
            </View>
          </View>
          
          {/* Right Section: QR Code & Client Rep */}
          <View style={styles.rightSection}>
            <View style={styles.qrCodeContainer}>
              <Text style={styles.qrCodeLabel}>Verification QR</Text>
              {data.qrCode && data.qrCode.startsWith('data:image') ? (
                <Image src={data.qrCode} style={styles.qrCode} />
              ) : (
                <View style={styles.qrCode}>
                  <Text style={styles.qrFallback}>QR Code{'\n'}Not Available</Text>
                </View>
              )}
            </View>
            
            <View style={styles.clientRepSection}>
              <Text style={styles.clientRepLabel}>
                Client/Contractor{'\n'}Representative
              </Text>
              <Text style={styles.clientRepName}>{data.clientRep || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default FrontPage;