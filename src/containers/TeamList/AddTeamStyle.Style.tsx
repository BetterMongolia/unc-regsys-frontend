import styled from "@emotion/styled";

export const Styles = styled.div`
  margin-top: 2rem;
  color: black;
  max-width: 100%;
  background-color: #fff;

  .table-wrap {
    position: relative;
    max-width: 100%;
    min-height: 400px;
    max-height: 680px;

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #fcffff;
      border: 1px solid #dfdfe2;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #3083ff;
    }
  }

  table {
    width: 100%;
    background: #fff;

    th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fff;
    }
    tr {
      :hover {
        background-color: #f9fafc;
      }
      :hover :nth-of-type(2) {
        color: #3083ff;
      }
      :hover :nth-of-type(7) svg {
        opacity: 100%;
      }
    }

    th,
    td {
      margin: 0;
      padding-right: 0.5rem;

      :first-of-type {
        paddign: 0;
      }
    }
    th {
      color: #3083ff;
      text-align: left;
      padding: 24px 0.5rem;
    }
    td {
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }
`;
