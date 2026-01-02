// src/services/authService.js

import { supabase } from '../lib/supabase'

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

class AuthService {
  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Sign up new user (Admin only)
   * Creates auth user and welder profile
   */
  async signUp(userData) {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            welder_name: userData.welderName,
          }
        }
      })

      if (authError) throw authError

      // 2. Create welder profile (if auth successful)
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('welders')
          .insert({
            certificate_no: userData.certificateNo,
            welder_name: userData.welderName,
            welder_name_short: userData.welderNameShort || '',
            iqama_passport_no: userData.iqamaPassport,
            designation: userData.designation || '',
            date_of_birth: userData.dateOfBirth,
            photo_url: userData.photoUrl || null,
            signature_url: userData.signatureUrl || null,
            client_contractor: userData.clientContractor || '',
            client_name_short: userData.clientNameShort || '',
            created_by: authData.user.id,
          })

        if (profileError) {
          // If profile creation fails, we should delete the auth user
          // For now, just log the error
          console.error('Profile creation error:', profileError)
          throw new Error('Failed to create welder profile: ' + profileError.message)
        }
      }

      return { data: authData, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error.message }
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      console.error('Get session error:', error)
      return { session: null, error: error.message }
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, error: error.message }
    }
  }

  /**
   * Update password
   */
  async updatePassword(newPassword) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Update password error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export default new AuthService()