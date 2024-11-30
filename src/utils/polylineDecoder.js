import polyline from "polyline";

export const decodePolyline = (encodedPolyline) => {
  try {
    return polyline.decode(encodedPolyline);
  } catch (error) {
    console.error("Error decoding polyline:", error);
    return [];
  }
};
