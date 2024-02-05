const AbstractManager = require("../AbstractManager/AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE User_ID = ?`,
      [id]
    );
  }

  login(user) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE Email = ?`, [
      user.Email,
    ]);
  }

  insert(user) {
    const query = `
      INSERT INTO ${this.table}
        (Username, LastName, FirstName, BirthDate, Age, Address, Email, Phone, Biography, hashedPassword, Role, Gender, ProfileImage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      user.Username,
      user.LastName,
      user.FirstName,
      user.BirthDate,
      user.Age,
      user.Address,
      user.Email,
      user.Phone,
      user.Biography,
      user.hashedPassword,
      user.Role,
      user.Gender,
      user.ProfileImage,
    ];
    return this.database.query(query, values);
  }

  update(user) {
    return this.database.query(
      `update ${this.table} SET 
      Username = ?, 
      LastName = ?, 
      FirstName = ?, 
      BirthDate = ?, 
      Age = ?, 
      Address = ?, 
      Email = ?, 
      Phone = ?, 
      Biography = ?,
      Role = ?, 
      Gender = ?, 
      ProfileImage = ? 
    WHERE User_id = ?`,
      [
        user.Username,
        user.LastName,
        user.FirstName,
        user.BirthDate,
        user.Age,
        user.Address,
        user.Email,
        user.Phone,
        user.Biography,
        user.Role,
        user.Gender,
        user.ProfileImage,
        user.id,
      ]
    );
  }

  updatePassword(user, userID) {
    return this.database.query(
      `update ${this.table} SET 
      HashedPassword = ?
      WHERE User_id = ?`,
      [user.hashedPassword, userID]
    );
  }

  findUserByEmail(email) {
    return this.database.query(`select * from  ${this.table} where Email = ?`, [
      email,
    ]);
  }

  checkUsernameAvailability(username) {
    return this.database
      .query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE Username = ?`, [
        username,
      ])
      .then(([results]) => {
        return results[0].count === 0;
      });
  }

  checkEmailAvailability(email) {
    return this.database
      .query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE Email = ?`, [
        email,
      ])
      .then(([results]) => {
        return results[0].count === 0;
      });
  }

  checkPhoneAvailability(phone) {
    return this.database
      .query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE Phone = ?`, [
        phone,
      ])
      .then(([results]) => {
        return results[0].count === 0;
      });
  }

  // Insérer un nouveau code de vérification pour un utilisateur
  insertVerificationCode(userId, code, expiresAt) {
    const query = `
      INSERT INTO email_verification
        (User_ID, verification_code, expires_at)
      VALUES (?, ?, ?)`;
    return this.database.query(query, [userId, code, expiresAt]);
  }

  // Trouver un code de vérification pour un utilisateur
  findVerificationCode(userId, code) {
    const query = `
      SELECT * FROM email_verification
      WHERE User_ID = ? AND verification_code = ? AND expires_at > NOW()`;
    return this.database.query(query, [userId, code]);
  }

  // Optionnel: Supprimer un code de vérification expiré ou déjà utilisé
  deleteVerificationCode(userId, code) {
    const query = `
      DELETE FROM email_verification
      WHERE User_ID = ? AND verification_code = ?`;
    return this.database.query(query, [userId, code]);
  }
}

module.exports = userManager;
