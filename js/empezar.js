document.addEventListener('DOMContentLoaded', () => {
  const APP_URL = 'https://app.mytherapymoment.com/'
  const THERAPIST_SLUG = 'cristian-olive'

  const currentParams = new URLSearchParams(
    window.location.search
  )

  const appUrl = new URL(APP_URL)

  // Parámetros necesarios para activar el flujo especial.
  appUrl.searchParams.set('flow', 'acquisition')

  appUrl.searchParams.set(
    'therapistSlug',
    THERAPIST_SLUG
  )

  // referralCode puede recibirse en camelCase o snake_case.
  const referralCode =
    currentParams.get('referralCode') ||
    currentParams.get('referral_code')

  if (referralCode?.trim()) {
    appUrl.searchParams.set(
      'referralCode',
      referralCode.trim().slice(0, 80)
    )
  }

  // Sólo reenviamos los parámetros UTM admitidos.
  const utmParameters = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ]

  utmParameters.forEach((parameterName) => {
    const value = currentParams.get(parameterName)

    if (!value?.trim()) return

    appUrl.searchParams.set(
      parameterName,
      value.trim().slice(0, 200)
    )
  })

  const registrationButtons = [
    document.getElementById('start-registration-btn'),
    document.getElementById(
      'start-registration-btn-secondary'
    )
  ]

  registrationButtons.forEach((button) => {
    if (!button) return

    button.href = appUrl.toString()
  })
})