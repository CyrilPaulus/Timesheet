using System;
using System.Linq;
using PrestationApi.Models;

namespace PrestationApi.Logic
{


    public class UserLogic
    {
        private readonly PrestationDbContext _db;

        public UserLogic(PrestationDbContext db)
        {
            _db = db;
        }

        public User GetById(int id)
        {
            return _db.Users.Find(id);
        }

        public IQueryable<User> GetAll()
        {
            return _db.Users.AsQueryable();
        }

        public User Update(User user, string code, string firstName, string lastName)
        {

            user.Code = code;
            user.FirstName = firstName;
            user.LastName = lastName;

            _db.SaveChanges();
            return user;
        }

        public void Delete(User user)
        {
            _db.Users.Remove(user);
            _db.SaveChanges();
        }

        public User Add(string code, string firstName, string lastName, bool commit = true)
        {
            var user = new User();
            user.Code = code;
            user.FirstName = firstName;
            user.LastName = lastName;
            user.CreationDate = DateTime.UtcNow;
            _db.Users.Add(user);

            if (commit)
                _db.SaveChanges();
            return user;
        }

    }

}