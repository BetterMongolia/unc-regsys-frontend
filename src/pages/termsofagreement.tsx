import React from "react";
import styled from "@emotion/styled";
import Head from "next/head";

const Styles = styled.div`
  max-width: 800px;
  padding-top: 6vh;
  margin: 0 auto;
  p.MsoNormal,
  li.MsoNormal,
  div.MsoNormal {
    margin-top: 0in;
    margin-right: 0in;
    margin-bottom: 8pt;
    margin-left: 0in;
    line-height: 125%;
    font-size: 11.5pt;
    font-family: "Calibri", sans-serif;
  }
  p.MsoListParagraph,
  li.MsoListParagraph,
  div.MsoListParagraph {
    margin-top: 0in;
    margin-right: 0in;
    margin-bottom: 8pt;
    margin-left: 0.5in;
    line-height: 125%;
    font-size: 11.5pt;
    font-family: "Calibri", sans-serif;
  }
  p.MsoListParagraphCxSpFirst,
  li.MsoListParagraphCxSpFirst,
  div.MsoListParagraphCxSpFirst {
    margin-top: 0in;
    margin-right: 0in;
    margin-bottom: 0in;
    margin-left: 0.5in;
    line-height: 125%;
    font-size: 11.5pt;
    font-family: "Calibri", sans-serif;
  }
  p.MsoListParagraphCxSpMiddle,
  li.MsoListParagraphCxSpMiddle,
  div.MsoListParagraphCxSpMiddle {
    margin-top: 0in;
    margin-right: 0in;
    margin-bottom: 0in;
    margin-left: 0.5in;
    line-height: 125%;
    font-size: 11.5pt;
    font-family: "Calibri", sans-serif;
  }
  p.MsoListParagraphCxSpLast,
  li.MsoListParagraphCxSpLast,
  div.MsoListParagraphCxSpLast {
    margin-top: 0in;
    margin-right: 0in;
    margin-bottom: 8pt;
    margin-left: 0.5in;
    line-height: 125%;
    font-size: 11.5pt;
    font-family: "Calibri", sans-serif;
  }
  .MsoChpDefault {
    font-family: "Calibri", sans-serif;
  }
  .MsoPapDefault {
    margin-bottom: 8pt;
    line-height: 125%;
  }
  @page WordSection1 {
    size: 8.5in 11in;
    margin: 1in 1in 1in 1in;
  }
  div.WordSection1 {
    page: WordSection1;
  }
  /* List Definitions */
  ol {
    margin-bottom: 0in;
  }
  ul {
    margin-bottom: 0in;
  }
`;

const TOA = () => {
  return (
    <>
      <Head>
        <title>MSC | Үйлчилгээний нөхцөл</title>
      </Head>
      <Styles>
        <div className="WordSection1">
          <p className="MsoNormal" style={{ textAlign: "center" }}>
            <b>
              <span
                style={{
                  fontFamily: "Times New Roman, serif",
                  marginRight: "2px",
                }}
              >
                “SPOK”
              </span>
            </b>
            <b>
              <span style={{ fontFamily: "Times New Roman, serif" }}>
                <span lang="MN">БҮРТГЭЛИЙН СИСТЕМИЙН ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ</span>
              </span>
            </b>
          </p>

          <p className="MsoNormal" style={{ textAlign: "justify" }}>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">
                бүртгэлийн систем нь спортын тэмцээн, уралдааны бүртгэлийг
                боловсронгуй болгох цахим үйлчилгээний систем юм. Энэхүү
                үйлчилгээний нөхцөлөөр уг системийг ашиглахтай холбоотой аливаа
                харилцааг зохицуулна.
              </span>
            </span>
          </p>

          <p className="MsoNormal" style={{ textAlign: "justify" }}>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Энэхүү нөхцлийн хэрэгжилтэд{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              “СПОК системс” ХХК
            </span>{" "}
            <span style={{ fontFamily: "Times New Roman, serif" }}> </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>/</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              цаашид
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}> “</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Үйлчилгээ үзүүлэгч
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>” </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              гэх/болон
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>/</span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              системийн хэрэглэгч{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>/</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              цаашид{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>“</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Хэрэглэгч
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>”</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              гэх
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>/</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              нар хамтран хяналт тавина.
            </span>
          </p>

          <p className="MsoNormal" style={{ textAlign: "justify" }}>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              “СПОК системс”{" "}
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              нь Хэрэглэгчдэд Үйлчилгээ үзүүлэгч болон гэрээт харилцагчдын
              мэдээллийг хүргэх, төлбөр тооцоог гар дороос шийдэж бүтээгдэхүүн,
              үйлчилгээ ашиглах боломжийг бүрдүүлэх зорилгоор үйл ажиллагаа
              явуулна.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ textAlign: "justify", textIndent: "-0.25in" }}
          >
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              1.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Та{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>“СПОК”</span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">
                {" "}
                системийн цахим хуудасруу нэвтрэн орж, өөрийн мэдээллээ
                бүртгүүлэн баталгаажуулснаар манай системийг ашиглах боломжтой
                болно. Бүртгүүлэх мэдээлэлд
              </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>:</span>
            <span style={{ fontFamily: "Times New Roman, serif" }}> </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "99pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span style={{ fontFamily: "Symbol" }}>
              ·
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Овог, нэр
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "99pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span style={{ fontFamily: "Symbol" }}>
              ·
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Регистрийн дугаар
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "99pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span style={{ fontFamily: "Symbol" }}>
              ·
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Гар утасны дугаар
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "99pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span style={{ fontFamily: "Symbol" }}>
              ·
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              И мэйл хаяг
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "99pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span style={{ fontFamily: "Symbol" }}>
              ·
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Бусад мэдээлэл
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ textAlign: "justify", textIndent: "-0.25in" }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              2.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Хэрэглэгч та{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              системд бүртгүүлснээр дараах эрхийг эдэлж, үүргийг хүлээнэ.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              2.1.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">
                системээр дамжуулан бүртгэл хийж буй спорт тэмцээн,
                уралдаануудад бүртгүүлэх эрх үүснэ.
              </span>
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              2.2.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              системд хувийн мэдээллээ үнэн зөв, бүрэн өгөх үүрэгтэй ба хувийн
              мэдээлэд өөрчлөлт орох үед{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">системийн </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>“</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Хувийн мэдээлэл
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>”</span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              хэсэгт шинэчлэн бүртгүүлэх.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              2.3.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Бүртгүүлж буй тэмцээнийхээ удирдамж болон холбогдох бусад дүрэм,
              журмыг даган мөрдөх үүрэгтэй.  
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              2.4.<span style={{ font: "7pt 'Times New Roman'" }}></span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Бүртгэлийн хураамж төлөх гэх зэрэг гүйлгээ хийхдээ дансны дугаар,
              мөнгөн дүнг зөв оруулж, сайтар нягтласаны дараа баталгаажуулах
              бөгөөд буру оруулснаас үүсэх хариуцлагыг өөрөө хүлээнэ.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              2.5.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Та өөрийн нэвтрэх мэдээлэл болон гүйлгээний нууц үгээ хадгалан
              хамгаалах үүрэгтэй.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ textAlign: "justify", textIndent: "-0.25in" }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">системсийн эрх, үүрэг </span>
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.1.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              системс
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              {" "}
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              нь дараах эрхтэй
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>:</span>
            <span style={{ fontFamily: "Times New Roman, serif" }}> </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "112.5pt",
              textAlign: "justify",
              textIndent: "-0.5in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.1.1.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Хэрэглэгчийн мэдээллийг ашиглан үйлчилгээ үзүүлэх.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "112.5pt",
              textAlign: "justify",
              textIndent: "-0.5in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.1.2.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Үйлчилгээний чанар, хүртээмжийг сайжруулах, шинэ бүтээгдэхүүн
              гаргахтай холбоотойгоор зах зээлийн судалгаа, шинжилгээ хийх.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "112.5pt",
              textAlign: "justify",
              textIndent: "-0.5in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.1.3.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Үйлчилгээ үзүүлэгч нь техникийн өөрчлөлт, шинэчлэлт хийх,
              үйлилгээний сайжруулалт зэрэг программын өөрчлөлт, шинэчлэлт хийх
              эрхтэй бөгөөд өөрчлөлт, шинэчлэлт хийх тохиолдолд{" "}
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}> СПОК </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">
                систем нь түр хугацааны зогсолт хийж болно.  
              </span>
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "63pt",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.2.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
               
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>SPOK </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              системс
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              {" "}
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              нь дараах үүрэгтэй
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>:</span>
            <span style={{ fontFamily: "Times New Roman, serif" }}> </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "112.5pt",
              textAlign: "justify",
              textIndent: "-0.5in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.2.1.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Үйлчилгээний мэдээ, мэдээлэлийг хүргэх.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "112.5pt",
              textAlign: "justify",
              textIndent: "-0.5in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.2.2.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Энэхүү үйлчилгээний нөхцөл болон хуульд зааснаас бусад тохиолдолд
              хэрэглэгчийн мэдээллийг бусдад задруулахгүй байх үүрэгтэй.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "112.5pt",
              textAlign: "justify",
              textIndent: "-0.5in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              3.2.3.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Хэрэглэгчийн бүртгэлийг өөрийн техникийн боломж, хүчин чадлын
              хүрээнд түргэн шуурхай найдвартай гүйцэтгэх, системийн тасралтгүй,
              хэвийн, аюулгүй ажиллагааг хангах үүрэгтэй.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ textAlign: "justify", textIndent: "-0.25in" }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              4.
              <span style={{ font: "7pt 'Times New Roman'" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Бусад 
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{
              marginLeft: "1in",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              4.1.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              Үйлчилгээнд бүртгүүлснээс хойш талуудын хүсэл зоригоос үл хамаарах
              шалтгаанаар тухайлбал гал түймэр, үер, газар хөдлөлт болон бусад
              тэсрэлт, дэлбэрэлт, цаг агаарын хэт халалт ба хүйтрэлт эсхүл
              төрийн эрх бүхий байгуулагын шийдвэр, нийтийг хамарсан эмх
              замбраагүй байдал, үймээн самуун, зэвсэгт мөргөлдөөн, дайн,
              террорист халдлага, улс орныг хамарсан түлш, эрчим хүчний
              хязгаарлалт, бүх нийтийг хамарсан сүлжээний хэт ачаалал, доголдол
              тасалдал зэрэг гэнэтийн буюу давагдашгүй шинжтэй нөхцөл байдлын
              улмаас талууд гэрээгээр хүлээсэн үүргээ биелүүлээгүй буюу зохих
              ёсоор биелүүлэх боломжгүй болсон тохиолдолд хариуцлага хүлээхгүй.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{
              marginLeft: "1in",
              textAlign: "justify",
              textIndent: "-0.25in",
            }}
          >
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              4.2.<span style={{ font: "7pt 'Times New Roman'" }}> </span>
            </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>СПОК </span>
            <span style={{ fontFamily: "Times New Roman, serif" }}>
              <span lang="MN">
                системтэй холбогдон гарч болзошгүй маргааныг талууд харилцан
                зөвшилцөх замаар шийдвэрлэхийг эрмэлзэх бөгөөд тийнхүү
                шийдвэрлэж чадахгүй тохиолдолд Монгол Улсын хууль тогтоомжын
                дагуу шүүхээр шийдвэрлүүлнэ.  
              </span>
            </span>
          </p>

          <p className="MsoNormal" style={{ textAlign: "justify" }}>
            <span lang="MN" style={{ fontFamily: "Times New Roman, serif" }}>
              &nbsp;
            </span>
          </p>

          <p className="MsoNormal" style={{ textAlign: "justify" }}>
            <span lang="MN">&nbsp;</span>
          </p>
        </div>
      </Styles>
    </>
  );
};

export default TOA;
