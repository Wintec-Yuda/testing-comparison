const BASE_URL =
  'https://hk-api.dev.kridatech.com/api'

export async function fetchWebsiteSettlement(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/web-operational/settlements/chart-fs?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  )

  return response.json()
}

export async function fetchMobileSettlement(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/app/settlements/chart-fs?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  )

  return response.json()
}

export async function fetchCommandCenter(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/command-center/v3/graph/settlement?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  )

  return response.json()
}

export async function fetchWebsiteSettlementRFS(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/web-operational/settlements/chart-rfs?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function fetchMobileSettlementRFS(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/app/settlements/chart-rfs?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function fetchWebsiteBankStatement(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/web-operational/settlements/chart-bank-statement?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function fetchMobileBankStatement(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/app/settlements/chart-bank-statement?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function fetchCashIn(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/command-center/v3/graph/cash-in?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function fetchWebsiteSettlementDetailMonth(
  year: number,
  month: number,
  token: string
) {
  const daysInMonth = new Date(
    year,
    month,
    0
  ).getDate()

  const response = await fetch(
    `${BASE_URL}/web-operational/settlements/details?year=${year}&month=${month}&page=1&per_page=${daysInMonth}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

export async function fetchMobileSettlementDetails(
  year: number,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/app/settlements/details?year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}