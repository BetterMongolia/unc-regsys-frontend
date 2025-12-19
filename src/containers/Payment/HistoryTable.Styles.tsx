import styled from "@emotion/styled";

export const Styles = styled.div`
  margin-top: 2rem;
  color: black;
  max-width: 100%;
  background-color: #fff;

  .table-wrap {
    position: relative;
    max-width: 100%;
    max-height: 680px;
    overflow-y: scroll;
  }
  table,
  td,
  th {
    border: 0.5px solid #dfdfe2;
  }

  table {
    width: 100%;
    border-spacing: 0;
    background: #fff;
    border-collapse: collapse;

    th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fff;
    }
    tr {
      /* :hover {
        background-color: #f9fafc;
      } */
      /* :hover :nth-of-type(2) {
        color: #3083FF;
      } */
      :hover :nth-of-type(7) svg {
        opacity: 100%;
      }
    }

    th,
    td {
      margin: 0;
      :last-of-type svg {
        opacity: 0%;
      }
    }
    th {
      color: #3083ff;
      text-align: left;
      padding: 24px 0.5rem;
      padding-left: 30px;
    }
    td {
      padding-top: 16px;
      padding-bottom: 16px;
      padding-left: 30px;
    }
  }
`;
