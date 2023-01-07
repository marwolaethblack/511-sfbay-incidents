import axios from "axios";
import { ITrafficEventsResponse } from "./types";

class SFBayApi {
  private token = process.env.REACT_APP_API_TOKEN;

  public async getTrafficEvents() {
    const res = await axios.get<ITrafficEventsResponse>(
      `http://api.511.org/traffic/events?api_key=${this.token}`
    );
    return res.data?.events;
  }
}

export const sfBayApi = new SFBayApi();
