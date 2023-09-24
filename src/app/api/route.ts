import { NextRequest, NextResponse } from "next/server";
import { getValues } from "@/actions/function-xyz";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const minVal = (searchParams.get("min-val") as string) || "";
  const maxVal = (searchParams.get("max-val") as string) || "";

  console.log(minVal);
  console.log(maxVal);

  return NextResponse.json({ value: "" });

  //   return await getValues(+minVal, +maxVal)
  //     .then((value) => {
  //       console.log("Success get values");
  //       console.log(value);
  //       return NextResponse.json(value);
  //     })
  //     .catch((error) => {
  //       return NextResponse.json(error);
  //     });
}
