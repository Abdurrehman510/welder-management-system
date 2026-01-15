import { View, Image } from '@react-pdf/renderer'
import { form1Styles } from '../Form1PDF/styles/form1Styles'

/**
 * PDF Watermark Component
 * ISS Logo watermark for all PDFs
 */

export default function PDFWatermark({ logoUrl }) {
  if (!logoUrl) return null

  return (
    <View style={form1Styles.watermark}>
      <Image src={logoUrl} style={{ width: '100%', height: '100%' }} />
    </View>
  )
}