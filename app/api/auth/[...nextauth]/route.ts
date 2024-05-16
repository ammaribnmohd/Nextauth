// pages/api/some-api-route.ts

import middleware from "@/middleware" ;// Update this path to the correct one

export default middleware;

export {GET, POST} from "@/auth"
//export const runtime = "edge" // optional   
