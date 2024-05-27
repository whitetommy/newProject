// import multer from "multer";
// import { NextResponse } from "next/server";
// import axios from "axios";
// import FormData from "form-data";

// // Multer configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// export const dynamic = "force-dynamic";

// export async function POST(request, Request) {
//   return new Promise((resolve) => {
//     upload.single("codefile")(request, {}, async (err) => {
//       if (err) {
//         console.error("파일 업로드 에러:", err);
//         return resolve(
//           NextResponse.json({ error: "파일 업로드 에러" }, { status: 500 })
//         );
//       }

//       const file = request.file;
//       if (!file) {
//         return resolve(
//           NextResponse.json(
//             { error: "파일이 업로드되지 않았습니다." },
//             { status: 400 }
//           )
//         );
//       }

//       const formData = new FormData();
//       formData.append("file", file.buffer, {
//         filename: file.originalname,
//         contentType: file.mimetype,
//       });

//       try {
//         const response = await axios.post(
//           "여기에 외부 엔진 API 엔드포인트..",
//           formData,
//           {
//             headers: formData.getHeaders(),
//           }
//         );
//         resolve(NextResponse.json(response.data));
//         // console.log(response.data);
//       } catch (error) {
//         console.error("외부 API 에러:", error);
//         resolve(
//           NextResponse.json(
//             { error: "외부 API 에러", details: error.message },
//             { status: 500 }
//           )
//         );
//       }
//     });
//   });
// }
