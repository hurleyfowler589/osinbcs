import { gql } from "@apollo/client";

export const GET_INSTALMENTS_2 = gql`
  query InstallmentContracts {
    installmentContracts {
      createdAt
      customerName
      customerPhone
      frequency
      frequencyMoney
      fromDate
      id
      installmentContractSchedule {
        createdAt
        fromDate
        id
        installmentContractId
        isDone
        note
        payDate
        payMoney
        toDate
        updatedAt
      }
      loanTime
      note
      rate
      status
      toDate
      totalMoney
      totalMoneyCurrent
      totalMoneyReceived
      updatedAt
    }
  }
`;

export const GET_INSTALMENTS = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const MAKE_PAYMENT = gql`
  mutation MakePayments($makePaymentInput: MakePaymentsInput!) {
    makePayments(makePaymentInput: $makePaymentInput) {
      createdAt
      fromDate
      id
      installmentContractId
      isDone
      note
      payDate
      payMoney
      toDate
      updatedAt
    }
  }
`;

export const UPDATE_INSTALMENT_SCHEDULE = gql`
  mutation UpdateInstallmentContractSchedule(
    $updateInstallmentContractScheduleInput: UpdateInstallmentContractScheduleInput!
  ) {
    updateInstallmentContractSchedule(
      updateInstallmentContractScheduleInput: $updateInstallmentContractScheduleInput
    ) {
      createdAt
      fromDate
      id
      installmentContractId
      isDone
      note
      payDate
      payMoney
      toDate
      updatedAt
    }
  }
`;

export const CREATE_INSTALMENT = gql`
  mutation CreateInstallmentContract(
    $createInstallmentContractInput: CreateInstallmentContractInput!
  ) {
    createInstallmentContract(
      createInstallmentContractInput: $createInstallmentContractInput
    ) {
      createdAt
      customerName
      customerPhone
      frequency
      frequencyMoney
      fromDate
      id
      loanTime
      note
      rate
      status
      toDate
      totalMoney
      totalMoneyCurrent
      totalMoneyReceived
      updatedAt
    }
  }
`;

export const DELETE_INSTALMENT = gql`
  mutation RemoveInstallmentContract($removeInstallmentContractId: Int!) {
    removeInstallmentContract(id: $removeInstallmentContractId) {
      id
    }
  }
`;

export const UPDATE_INSTALMENT = gql`
  mutation UpdateInstallmentContract(
    $updateInstallmentContractInput: UpdateInstallmentContractInput!
  ) {
    updateInstallmentContract(
      updateInstallmentContractInput: $updateInstallmentContractInput
    ) {
      id
    }
  }
`;
