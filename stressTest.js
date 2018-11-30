// import { check, sleep } from "k6";
import http from "k6/http";

export let options = {

  stages: [
    { duration: "20s", target: 50 },
    { duration: "20s", target: 50 },
    { duration: "20s", target: 10 }
  ],

  discardResponseBodies: true,

  ext: {
    loadimpact: {
      distribution: {
        loadZoneLabel1: { loadZone: "amazon:us:ashburn", percent: 100 },
      }
    }
  }
};

export default function() {
  let res = http.get("http://localhost:3002/");

  // check(res, {
  //     "is status 200": (r) => r.status === 200
  // });

  // sleep(3);
}
