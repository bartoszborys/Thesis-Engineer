using Backend.DatabaseModels;

namespace Backend.Lib.EmailValidators
{
    public interface IDetailsValidationHandler
    {
        void Validate(Userdetails details);
    }
}