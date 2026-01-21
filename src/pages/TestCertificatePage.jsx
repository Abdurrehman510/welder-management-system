import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'sonner';
import CertificatePDF from '../components/pdf/CertificatePDF';

/**
 * Test page for Complete Certificate PDF
 * Includes ALL 18 qualification attributes
 */

// Complete static test data with all attributes
const completeTestData = {
  // Front page
  cardNo: 'W.Q.T - 25161-0756',
  welderName: 'A Thulasi',
  iqamaPassport: '2468077942',
  welderNo: 'MZN-383',
  company: 'A M G C ESt.',
  inspectorName: 'ABDUL HASEEB',
  cswipCertNo: '456383',
  clientRep: 'Mr. G. PURUSHOTH',
  photoUrl: 'https://via.placeholder.com/150x180/4A90E2/FFFFFF?text=A+THULASI',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/verify/25161-0756',
  signatureUrl: null,
  
  // Back page header
  testingWONo: '',
  symbolIDNo: 'MZN-383',
  wpsNo: 'MZN/WPS-126/11 Rev.0',
  dateWelded: '05 Mar 2025',
  
  // ALL 18 QUALIFICATION ATTRIBUTES
  // 1. Welding Process
  weldingProcess: 'GTAW + SMAW',
  weldingProcessRange: 'GTAW + SMAW',
  
  // 2. Type
  weldingType: 'Manual',
  weldingTypeRange: 'Manual',
  
  // 3. P No
  pNo: 'P-No.1 To P-No.1',
  pNoRange: 'P-No.1 thru P-No.15F, P-No.34 & P-No.41 thru P-No.49',
  
  // 4. Diameter (Tube)
  diameterTube: 'Ø 6" SCH 40',
  diameterTubeRange: 'All sizes',
  
  // 5. Thickness (Tube)
  thicknessTube: '8.56 mm',
  thicknessTubeRange: '3mm to 25mm',
  
  // 6. Ligament Size
  ligamentSize: 'N/A',
  ligamentSizeRange: 'N/A',
  
  // 7. Groove Type
  grooveType: 'V-Groove',
  grooveTypeRange: 'All groove types',
  
  // 8. Depth of Groove
  depthOfGroove: '8mm',
  depthOfGrooveRange: '3mm to 25mm',
  
  // 9. Filler Metal Class & F No
  fillerMetalClass: 'F-No. 6 + F-No. 4',
  fillerMetalClassRange: 'All F No.6 With or Without & F No.1 thru F No.4 With Backing',
  
  // 10. Filler Metal Product Form
  fillerMetalForm: 'Solid',
  fillerMetalFormRange: 'Solid',
  
  // 11. Backing
  backing: 'GTAW-Without & SMAW-With Backing',
  backingRange: 'GTAW With or Without & SMAW With Backing',
  
  // 12. Position
  position: 'Groove-6G',
  positionRange: 'PLATE & PIPE OVER 24" OD (F, V) AND PIPE 2⅜" OD',
  
  // 13. Progression
  progression: 'Uphill',
  progressionRange: 'Uphill',
  
  // 14. Current Level (1st Layer)
  currentLevel1: 'Layer, (1, Ø 1.6MM)',
  currentLevel1Range: 'All current levels',
  
  // 15. Current Level (2nd Layer)
  currentLevel2: 'Layer, (2, Ø 1.6MM)',
  currentLevel2Range: 'All current levels',
  
  // 16. Replaced Filler Metal
  replacedFillerMetal: 'N/A',
  replacedFillerMetalRange: 'N/A',
  
  // 17. Inert Gas Backing (GTAW)
  inertGasBacking: 'Without Inert Gas Backing',
  inertGasBackingRange: 'With or without Inert Gas Backing',
  
  // 18. Current & Polarity (GTAW)
  currentPolarity: 'DCEN',
  currentPolarityRange: 'DCEN',
  
  // Footer
  formNo: 'MLF-',
  footerDate: '20 Oct 2025'
};

const TestCertificatePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      console.log('🎴 Generating Complete Certificate PDF with 18 attributes...');
      
      const blob = await pdf(<CertificatePDF data={completeTestData} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Complete_Certificate_${completeTestData.cardNo.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Certificate PDF Downloaded!', {
        description: 'Complete with all 18 qualification attributes',
        duration: 3000,
      });
      
    } catch (error) {
      console.error('❌ PDF generation error:', error);
      toast.error('Failed to generate PDF', {
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mb-4">
            <span className="text-4xl">🎴</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Certificate PDF
          </h1>
          <p className="text-lg text-gray-600">
            Structured format with ALL 18 qualification attributes
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gray-800 text-white px-8 py-6">
            <h2 className="text-2xl font-bold mb-3">📋 Complete Attribute List</h2>
            <p className="text-gray-300">All 18 qualification attributes from your sample certificates</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Attributes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Front Page Info */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  Front Page Information
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Card No', completeTestData.cardNo],
                    ['Welder Name', completeTestData.welderName],
                    ['Iqama/Passport', completeTestData.iqamaPassport],
                    ['Welder No', completeTestData.welderNo],
                    ['Company', completeTestData.company],
                    ['Inspector', completeTestData.inspectorName],
                    ['CSWIP Cert', completeTestData.cswipCertNo],
                    ['Client Rep', completeTestData.clientRep],
                  ].map(([label, value], idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-200 pb-1">
                      <span className="font-medium text-gray-600">{label}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Page Header */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Back Page Header
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Testing WO No', completeTestData.testingWONo || 'N/A'],
                    ['Symbol/ID No', completeTestData.symbolIDNo],
                    ['WPS No', completeTestData.wpsNo],
                    ['Date Welded', completeTestData.dateWelded],
                  ].map(([label, value], idx) => (
                    <div key={idx} className="flex justify-between border-b border-blue-200 pb-1">
                      <span className="font-medium text-gray-600">{label}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All 18 Attributes */}
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl">📋</span>
                All 18 Qualification Attributes
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  ['1. Welding Process', completeTestData.weldingProcess],
                  ['2. Type (Manual/Semi-Auto/Auto)', completeTestData.weldingType],
                  ['3. P No', completeTestData.pNo],
                  ['4. Diameter (Tube)', completeTestData.diameterTube],
                  ['5. Thickness (Tube)', completeTestData.thicknessTube],
                  ['6. Ligament Size', completeTestData.ligamentSize],
                  ['7. Groove Type', completeTestData.grooveType],
                  ['8. Depth of Groove', completeTestData.depthOfGroove],
                  ['9. Filler Metal Class & F No', completeTestData.fillerMetalClass],
                  ['10. Filler Metal Product Form', completeTestData.fillerMetalForm],
                  ['11. Backing (With/Without)', completeTestData.backing],
                  ['12. Position', completeTestData.position],
                  ['13. Progression', completeTestData.progression],
                  ['14. Current Level (1st Layer, Ø 1.6mm)', completeTestData.currentLevel1],
                  ['15. Current Level (2nd Layer, Ø 1.6mm)', completeTestData.currentLevel2],
                  ['16. Replaced Filler Metal', completeTestData.replacedFillerMetal],
                  ['17. Inert Gas Backing (GTAW)', completeTestData.inertGasBacking],
                  ['18. Current & Polarity (GTAW)', completeTestData.currentPolarity],
                ].map(([label, value], idx) => (
                  <div key={idx} className="bg-white rounded p-3 border border-orange-200 flex justify-between items-center">
                    <span className="font-medium text-gray-700 text-sm">{label}</span>
                    <span className="text-gray-900 text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Complete Certificate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-bold text-gray-900 mb-2">All 18 Attributes</h3>
            <p className="text-sm text-gray-600">
              Every single qualification variable from your sample certificates included
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="font-bold text-gray-900 mb-2">Background Logo</h3>
            <p className="text-sm text-gray-600">
              ISS favicon watermark added to front page background
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-3xl mb-3">📏</div>
            <h3 className="font-bold text-gray-900 mb-2">Structured Layout</h3>
            <p className="text-sm text-gray-600">
              Clean, low-profile design with proper spacing and margins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCertificatePage;