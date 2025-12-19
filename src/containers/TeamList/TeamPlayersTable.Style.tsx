import styled from "@emotion/styled";

export const Styles = styled.div`
  color: black;
  max-width: 100%;
  .table-wrap {
    position: relative;
    max-width: 100%;
    height: 350px;
    max-height: 680px;
    overflow-y: scroll;
    border: 1px solid #002b82;
    border-right: 1px solid transparent;
    border-left: 1px solid transparent;

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
    border-spacing: 0;
    border-radius: 8px;
    background: #fff;
    border-collapse: separate;

    th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 10;
      background: #fff;
      padding-top: 26px;
      padding-bottom: 26px;
    }
    tr {
      :hover {
        background-color: #f9fafc;
      }
      :hover td:nth-of-type(5) svg {
        opacity: 100%;
      }
    }

    th,
    td {
      margin: 0;

      text-transform: capitalize;
      :first-of-type {
        padding-left: 30px;
        padding-left: 30px;
      }
    }
    th {
      color: #3083ff;
      text-align: left;
      white-space: nowrap;

      border-bottom: 1px solid #dfdfe2;
    }
    td {
      padding-top: 26px;
      padding-bottom: 26px;
      :nth-of-type(5) svg {
        opacity: 0%;
      }
    }
  }
`;
