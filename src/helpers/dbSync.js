import { Member, Ministry, Finance, Event, Presence } from "../models/index.js";

/* Initialize database tables */
await Member.sync();
await Ministry.sync();
await Finance.sync();
await Event.sync();
await Presence.sync();

