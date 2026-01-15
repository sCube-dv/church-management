import User from "./User.js";
import Member from "./Member.js";
import Ministry from "./Ministry.js";
import Finance from "./Finance.js";
import Event from "./Event.js";
import Presence from "./Presence.js";

/* relationships */

// User - Member (one-to-many) -> User can manage members
User.hasMany(Member, { foreignKey: 'id_user' });
Member.belongsTo(User, { foreignKey: 'id_user' });

// Member - Finance (one-to-many)
Member.hasMany(Finance, { foreignKey: 'id_member' });
Finance.belongsTo(Member, { foreignKey: 'id_member' });

// Member - Ministry (one-to-many) -> Ministry Lidership
Member.hasMany(Ministry, { foreignKey: 'id_member' });
Ministry.belongsTo(Member, { foreignKey: 'id_member' });

// Presence - Event (many-to-many)
Member.belongsToMany(Event, { through: Presence, foreignKey: 'id_member' });
Event.belongsToMany(Member, { through: Presence, foreignKey: 'id_event' });


export { User, Member, Ministry, Finance, Event, Presence };
