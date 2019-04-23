using Backend.DatabaseModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Lib.ThesisFiles
{
    public class ThesisFile
    {
        private const string thesisDir = "thesis";
        
        public void PreparePath(int graduateId)
        {
            if (!Directory.Exists(thesisDir))
            {
                Directory.CreateDirectory(thesisDir);
            }
            
            string graduateDir = this.GetGraduateDir(graduateId);
            if (!Directory.Exists(graduateDir))
            {
                Directory.CreateDirectory(graduateDir);
            }
        }

        public string GetPath(int graduateId, string role)
        {
            string graduateDir = this.GetGraduateDir(graduateId);
            string fileName = $"{role}_file.pdf";
            return $"{graduateDir}/{fileName}";
        }

        private string GetGraduateDir(int graduateId)
        {
            return $"{thesisDir}/{graduateId}";
        }
    }
}
