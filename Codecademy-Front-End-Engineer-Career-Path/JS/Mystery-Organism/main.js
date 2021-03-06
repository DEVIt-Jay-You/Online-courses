// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// pAequor factory function
pAequorFactory = (num, dna) => {
  return {
    specimen: num,
    dna: dna,

    // mutate() method
    mutate() {
      // generate a random integer
      let randIndex = Math.floor(Math.random() * this.dna.length);

      let mutBase = returnRandBase();

      // while initial base is equal to mutated base, assign a new mutated base
      while (this.dna[randIndex] === mutBase) {
        mutBase = returnRandBase();
      }
      this.dna[randIndex] = mutBase;
      return this.dna;
    },

    // compareDNA() method
    compareDNA(newOrganism) {
      let matchCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === newOrganism[i]) {
          matchCount += 1;
        }
      }
      let percent = Math.floor(matchCount / newOrganism.length) * 100;
      console.log(
        `Specimen #${this.specimenNum} and Specimen #${newOrganism.specimenNum} have ${percent}% DNA in common!`
      );
    },

    // DNA with at least 60% survival rate
    willLikelySurvive() {
      let countCG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          countCG += 1;
        }
        survPercent = Math.round(countCG / this.dna.length) * 100;
      }
      if (survPercent >= 60) {
        return true;
      }
      return false;
    },

    // Complement strand
    complementStrand() {
      // method to return the complementary DNA strand( A <-> T, C <-> G)
      let cStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        // iterates through the strand bases
        if (this.dna[i] === "A") {
          cStrand.push("T");
        } // replaces A with T
        else if (this.dna[i] === "T") {
          cStrand.push("A");
        } // replaces T with A
        else if (this.dna[i] === "C") {
          cStrand.push("G");
        } // replaces C with G
        else if (this.dna[i] === "G") {
          cStrand.push("C");
        } // replaces G with C
        else cStrand.push(this.dna[i]);
      }
      return cStrand;
    },
  };
};

// Generate 30 instances of surviving specimen
function generatePool() {
  const pool = [];
  let i = 1;
  let j = pAequorFactory(i, mockUpStarnd());
  while (i <= 30) {
    j = pAequorFactory(i, mockUpStrand());
    if (j.willLikelySurvive() === true) {
      pool.push(j);
      i++;
    }
  }
  return pool;
}

////////////////////// Test /////////////////////
const specimen7 = pAequorFactory(7, mockUpStrand());
console.log(specimen7.dna);
console.log(specimen7.mutate());
console.log(specimen7.compareDNA(mockUpStrand()));
console.log(specimen7.willLikelySurvive());
console.log(specimen7.complementStrand());
