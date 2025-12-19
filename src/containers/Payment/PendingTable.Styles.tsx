import styled from "@emotion/styled";

export const Styles = styled.div`
  margin-top: 2rem;
  color: black;
  max-width: 100%;

  .table-wrap {
    position: relative;
    max-width: 100%;
    max-height: 680px;
    // overflow-y: scroll;
    border: 1px solid #dfdfe2;
    // border-radius: 15px;
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

    background: #fff;
    border-collapse: separate;

    th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fff;
      border-bottom: 0.5px solid #dfdfe2;
      border-top: 1px solid transparent;
      :last-of-type {
        padding-right: 20px;
      }
    }
    tr {
      :nth-of-type(1) {
        border-top: 1px solid transparent;
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
      border-bottom: 1px dashed #dfdfe2;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0px;
    th {
      display: none;
    }
    .table-wrap {
      overflow: auto;
      max-height: unset;
    }
  }
`;
