import cron from "node-cron";
import { Op } from "sequelize";
import usersModel from "../../models/users.js";

const cronJobs = () => {
  cron.schedule("*/10 * * * *", async () => {
    const currentTime = new Date();
    const expiredUser = await usersModel.findAll({
      where: {
        tokenExpiredAt: {
          [Op.lt]: currentTime,
        },
        loggedIn: 1,
      },
    });

    for (const user of expiredUser) {
      await usersModel.update(
        { loggedIn: 0 },
        { where: { encryptedId: user.encryptedId } }
      );

      console.log(
        `User ${user.name} has been logged out automatically due to token expiry.`
      );
    }
  });

  console.log(
    "Cron job started: Automatically logging out users with expired tokens every 10 minutes."
  );
};

export default cronJobs;
