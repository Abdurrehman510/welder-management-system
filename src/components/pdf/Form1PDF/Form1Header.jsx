import { View, Text, Image } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Header Component
 * Company info, logo, welder photo, and QR code
 */

export default function Form1Header({ data }) {
  const logoUrl = '/iss_logo_fevicon.png'
  const placeholderPhoto = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gUGhvdG88L3RleHQ+PC9zdmc+'

  return (
    <View style={form1Styles.header}>
      {/* Left: Logo */}
      <View style={form1Styles.logoContainer}>
        <Image src={logoUrl} style={form1Styles.logo} />
      </View>

      {/* Center: Company Info */}
      <View style={form1Styles.companyInfo}>
        <Text style={form1Styles.companyName}>
          {'Industrial Support Services Company'}
        </Text>
        <Text style={form1Styles.companyDetails}>
          Post Box 11501, Dammam 31463, K.S.A
        </Text>
        <Text style={form1Styles.companyDetails}>
          Ph # +966 13 844 7733 | Fax # +966 13 844 8833
        </Text>
        <Text style={form1Styles.companyDetails}>
          Email: info@issksa.com
        </Text>
      </View>

      {/* Right: Welder Photo */}
      <View style={form1Styles.photoContainer}>
        <Image 
          src={data.photoUrl || placeholderPhoto} 
          style={form1Styles.photo}
        />
      </View>

      {/* Far Right: QR Code */}
      {data.qrCode && (
        <View style={form1Styles.qrContainer}>
          <Image src={data.qrCode} style={form1Styles.qrCode} />
        </View>
      )}
    </View>
  )
}