export interface Penetration {
  month: number
  mandiri: number
  mandiri_percentage: number
  bni: number
  bni_percentage: number
  bri: number
  bri_percentage: number
  bca: number
  bca_percentage: number
  dki: number
  dki_percentage: number
}

export interface BankValidationSummary {
  total: number
  total_fs: number
  total_fs_difference: number
  total_fs_percentage: number
  total_rfs: number
  total_rfs_difference: number
  total_rfs_percentage: number
  total_bank_statement: number
  total_bank_statement_difference: number
  total_bank_statement_percentage: number
}

export interface BankValidationReport {
  report_date: string
  total_all_banks: BankValidationSummary
  details: {
    bni: BankValidationSummary
    bri: BankValidationSummary
    bca: BankValidationSummary
    mandiri: BankValidationSummary
    dki: BankValidationSummary
  }
}

export interface SettlementSummary {
  bank_statement_total: number,
  revenue_total: number
}

export interface MonthlyBankValidationReport {
  month: number
  total_all_banks: BankValidationSummary
  details: {
    bni: BankValidationSummary
    bri: BankValidationSummary
    bca: BankValidationSummary
    mandiri: BankValidationSummary
    dki: BankValidationSummary
  }
}

export interface Settlement {
  month: number
  mandiri: number
  bni: number
  bri: number
  bca: number
  dki: number
}

export interface CommandCenterMonthly {
  month: number
  fs_total: number
  fs_accumulation: number
  difference: number
  rfs_percentage: number
  rfs_total: number
}

export interface ValidationRow {
  month: number
  website: number
  mobile: number
  commandCenter: number
  websiteMobileMatch: boolean
  websiteCCMatch: boolean
}