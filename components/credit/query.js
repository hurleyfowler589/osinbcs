import { gql } from "@apollo/client";

export const GET_CREDITS = gql`
  query MortgageContracts {
    mortgageContracts {
      createdAt
      customerName
      customerPhone
      frequency
      fromDate
      id
      interest
      interestMoneyReceived
      loanTime
      mortgageContractSchedule {
        createdAt
        frequency
        fromDate
        id
        isDone
        mortgageContractId
        note
        payDate
        payMoney
        toDate
        updatedAt
      }
      note
      status
      toDate
      totalInterest
      totalMoney
      updatedAt
    }
  }
`;

export const CREATE_CREDIT = gql`
  mutation CreateMortgageContract(
    $createMortgageContractInput: CreateMortgageContractInput!
  ) {
    createMortgageContract(
      createMortgageContractInput: $createMortgageContractInput
    ) {
      createdAt
      customerName
      customerPhone
      frequency
      fromDate
      id
      interest
      interestMoneyReceived
      loanTime
      note
      status
      toDate
      totalInterest
      totalMoney
      updatedAt
      mortgageContractSchedule {
        createdAt
        frequency
        fromDate
        id
        isDone
        mortgageContractId
        note
        payDate
        payMoney
        toDate
        updatedAt
      }
    }
  }
`;

export const UPDATE_CREDIT = gql`
  mutation UpdateMortgageContract(
    $updateMortgageContractInput: UpdateMortgageContractInput!
  ) {
    updateMortgageContract(
      updateMortgageContractInput: $updateMortgageContractInput
    ) {
      createdAt
      customerName
      customerPhone
      frequency
      fromDate
      id
      interest
      interestMoneyReceived
      loanTime
      note
      toDate
      totalInterest
      totalMoney
      updatedAt
      mortgageContractSchedule {
        createdAt
        frequency
        fromDate
        id
        isDone
        mortgageContractId
        note
        payDate
        payMoney
        toDate
        updatedAt
      }
    }
  }
`;

export const DELETE_CREDIT = gql`
  mutation RemoveMortgageContract($removeMortgageContractId: Int!) {
    removeMortgageContract(id: $removeMortgageContractId) {
      id
    }
  }
`;

export const MAKE_PAYMENT = gql`
  mutation MakeMortgagePayments($makePaymentInput: MakePaymentsInput!) {
    makeMortgagePayments(makePaymentInput: $makePaymentInput) {
      createdAt
      frequency
      fromDate
      id
      isDone
      mortgageContractId
      note
      payDate
      payMoney
      toDate
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateMortgageContractSchedule($updateMortgageContractScheduleInput: UpdateMortgageContractScheduleInput!) {
  updateMortgageContractSchedule(updateMortgageContractScheduleInput: $updateMortgageContractScheduleInput) {
    createdAt
    frequency
    fromDate
    id
    isDone
    mortgageContractId
    note
    payDate
    payMoney
    toDate
    updatedAt
  }
}
`