// src/components/pdf/CertificateBack.jsx
import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from './certificateStyles';

/**
 * 🎴 CERTIFICATE BACK PAGE
 * Contains: Header, WPS Info, Qualifications Table, Footer
 * NO WATERMARK on back page
 */

const BackPage = ({ data }) => {
  const qualifications = data.qualifications || [];
  const hasQualifications = qualifications.length > 0;

  // Default qualifications from the image if none provided
  const defaultQualifications = [
    { variable: "Welding Process", actual: "GTAW + SMAW", range: "GTAW + SMAW" },
    { variable: "TYPE (Manual/Semi/Auto)", actual: "Manual", range: "Manual" },
    { variable: "No", actual: "P-No.1 To P-No.1", range: "P-No.1 thru P-No.15F, P-No.34 & P-No.41 thru P-No.49" },
    { variable: "DIAMETER (TUBE)", actual: "2 ½", range: "Plate & Pipe 1 (25 mm) O.D & Over" },
    { variable: "THICKNESS (TUBE)", actual: "14.02 mm", range: "Up to 14.02 mm" },
    { variable: "LIGAMENT SIZE", actual: "", range: "" },
    { variable: "GROOVE TYPE", actual: "", range: "" },
    { variable: "DEPTH OF GROOVE", actual: "", range: "" },
    { variable: "FILLER METAL CLASS & F NO", actual: "F-No. 6 + F-No. 4", range: "All F No.6 With or Without & F No.1 thru. F No.4 With Bonus" },
    { variable: "FILLER METAL PRODUCT FORM", actual: "Solid", range: "Solid" },
    { variable: "BACKING (WITH, WITHOUT)", actual: "GTAW-Without & SMAW-With Backing", range: "GTAW With or Without & SMAW With Backing" },
    { variable: "POSITION", actual: "Groove-6G", range: "Industrial Support Services Co. Ltd. (ISS) is a distributor and Installer Carrier Carrier" },
    { variable: "PROGRESSION", actual: "Uphill", range: "Uphill" },
    { variable: "CURRENT LEVEL (1st Layer, Ø1.6MM)", actual: "5.0 mm", range: "Up to 10.0 mm Thickness" },
    { variable: "CURRENT LEVEL (2nd Layer, Ø1.6MM)", actual: "9.02 mm", range: "Up to 18.04 mm Thickness" },
    { variable: "REPLACED FILLER METAL", actual: "", range: "" },
    { variable: "INERT GAS BACKING (GTAW)", actual: "Without Inert Gas Backing", range: "With or Without Inert Gas Backing Only" },
    { variable: "CURRENT & POLARITY (GTAW)", actual: "DCEN", range: "DCEN" },
  ];

  const displayQualifications = hasQualifications ? qualifications : defaultQualifications;

  return (
    <Page size={[242.65, 153]} style={styles.page}>
      <View style={styles.backPage}>
        {/* Header */}
        <View style={styles.backHeader}>
          <Text style={styles.backHeaderText}>
            Testing WO No.: {data.testingWONo || 'N/A'}
          </Text>
          <Text style={styles.backHeaderText}>
            Symbol/ID No.: {data.symbolIDNo || 'MZN-3831'}
          </Text>
        </View>
        
        {/* WPS Section */}
        <View style={styles.wpsSection}>
          <Text style={styles.wpsText}>
            WPS No.: <Text style={styles.wpsValue}>{data.wpsNo || 'MZN/WPS-126/11  Rev.0'}</Text>
          </Text>
          <Text style={styles.wpsText}>
            Date Welded: <Text style={styles.wpsValue}>{data.dateWelded || '05 Mar 2025'}</Text>
          </Text>
        </View>
        
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.tableCol1]}>
            Variables
          </Text>
          <Text style={[styles.tableHeaderCell, styles.tableCol2]}>
            Used in Qualification
          </Text>
          <Text style={[styles.tableHeaderCell, styles.tableCol3]}>
            Range Qualified
          </Text>
        </View>
        
        {/* Table Rows */}
        {displayQualifications.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCellBold, styles.tableCol1]}>
              {row.variable || ''}
            </Text>
            <Text style={[styles.tableCell, styles.tableCol2]}>
              {row.actual || ''}
            </Text>
            <Text style={[styles.tableCell, styles.tableCol3]}>
              {row.range || ''}
            </Text>
          </View>
        ))}
        
        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            This card on its own qualifies the welder for 6 months from the date welded. 
            Beyond this date welding records must be verified to ensure the welder's 
            qualification has been maintained.
          </Text>
          <View style={styles.footerInfo}>
            <Text style={styles.footerFormNo}>
              Form no: ISS_MLF-{data.formNo || '001'}
            </Text>
            <Text style={styles.footerDate}>
              Signed: {data.signature || 'MZIN-WS-126/11-26/09, 25/2'}
              {'  '}Date: {data.footerDate || '30 Oct 2025'}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default BackPage;