// ============================================================
// Extended Question Bank — 100+ questions across 5 skills
// ============================================================

import type { PlacementQuestion } from './questions'

export const EXTENDED_QUESTIONS: PlacementQuestion[] = [
  // ══════════════════════════════════════════════════════════
  // ARITHMETIC — 25 questions
  // ══════════════════════════════════════════════════════════
  { id:'ar-01', skill:'arithmetic', difficulty:1, question:'What is 2 + 3?', choices:['4','5','6','7'], correct:1, hint:'Count up from 2.', explanation:'2 + 3 = 5' },
  { id:'ar-02', skill:'arithmetic', difficulty:1, question:'What is 9 - 4?', choices:['3','4','5','6'], correct:2, hint:'Start at 9, count back 4.', explanation:'9 - 4 = 5' },
  { id:'ar-03', skill:'arithmetic', difficulty:1, question:'What is 6 + 7?', choices:['11','12','13','14'], correct:2, hint:'6 + 6 = 12, then one more.', explanation:'6 + 7 = 13' },
  { id:'ar-04', skill:'arithmetic', difficulty:1, question:'What is 15 - 8?', choices:['5','6','7','8'], correct:2, hint:'15 - 5 = 10, then 3 more.', explanation:'15 - 8 = 7' },
  { id:'ar-05', skill:'arithmetic', difficulty:2, question:'What is 6 × 7?', choices:['36','40','42','48'], correct:2, hint:'6 × 6 = 36, add one more 6.', explanation:'6 × 7 = 42' },
  { id:'ar-06', skill:'arithmetic', difficulty:2, question:'What is 8 × 9?', choices:['63','70','72','81'], correct:2, hint:'8 × 10 = 80, minus 8.', explanation:'8 × 9 = 72' },
  { id:'ar-07', skill:'arithmetic', difficulty:2, question:'What is 56 ÷ 7?', choices:['6','7','8','9'], correct:2, hint:'What times 7 equals 56?', explanation:'56 ÷ 7 = 8 because 7 × 8 = 56' },
  { id:'ar-08', skill:'arithmetic', difficulty:2, question:'What is 63 ÷ 9?', choices:['6','7','8','9'], correct:1, hint:'What times 9 equals 63?', explanation:'63 ÷ 9 = 7 because 9 × 7 = 63' },
  { id:'ar-09', skill:'arithmetic', difficulty:2, question:'What is 12 × 4?', choices:['44','46','48','50'], correct:2, hint:'12 × 4 = 10×4 + 2×4', explanation:'12 × 4 = 48' },
  { id:'ar-10', skill:'arithmetic', difficulty:3, question:'What is 234 + 178?', choices:['402','410','412','422'], correct:2, hint:'Add hundreds, then tens, then ones.', explanation:'234 + 178 = 412' },
  { id:'ar-11', skill:'arithmetic', difficulty:3, question:'What is 500 - 263?', choices:['227','237','247','257'], correct:1, hint:'500 - 263: borrow from hundreds.', explanation:'500 - 263 = 237' },
  { id:'ar-12', skill:'arithmetic', difficulty:3, question:'What is 24 × 5?', choices:['100','110','120','130'], correct:2, hint:'24 × 5 = 24 × 10 ÷ 2', explanation:'24 × 5 = 120' },
  { id:'ar-13', skill:'arithmetic', difficulty:3, question:'What is 144 ÷ 12?', choices:['10','11','12','13'], correct:2, hint:'12 × 12 = ?', explanation:'144 ÷ 12 = 12' },
  { id:'ar-14', skill:'arithmetic', difficulty:3, question:'What is 18 × 6?', choices:['98','104','108','112'], correct:2, hint:'18 × 6 = 20×6 - 2×6', explanation:'18 × 6 = 108' },
  { id:'ar-15', skill:'arithmetic', difficulty:3, question:'What is 999 + 111?', choices:['1100','1110','1111','1120'], correct:1, hint:'Add step by step.', explanation:'999 + 111 = 1110' },
  { id:'ar-16', skill:'arithmetic', difficulty:4, question:'What is 25²?', choices:['525','575','625','675'], correct:2, hint:'25 × 25 = 25 × 20 + 25 × 5', explanation:'25² = 625' },
  { id:'ar-17', skill:'arithmetic', difficulty:4, question:'What is 15% of 200?', choices:['25','30','35','40'], correct:1, hint:'10% of 200 = 20, 5% = 10', explanation:'15% of 200 = 30' },
  { id:'ar-18', skill:'arithmetic', difficulty:4, question:'What is 3⁴?', choices:['27','54','81','108'], correct:2, hint:'3⁴ = 3 × 3 × 3 × 3', explanation:'3⁴ = 81' },
  { id:'ar-19', skill:'arithmetic', difficulty:4, question:'What is √144?', choices:['11','12','13','14'], correct:1, hint:'What number times itself equals 144?', explanation:'√144 = 12 because 12 × 12 = 144' },
  { id:'ar-20', skill:'arithmetic', difficulty:4, question:'What is 20% of 350?', choices:['60','65','70','75'], correct:2, hint:'20% = 1/5, so divide by 5.', explanation:'20% of 350 = 350 ÷ 5 = 70' },
  { id:'ar-21', skill:'arithmetic', difficulty:5, question:'What is 13 × 17?', choices:['201','211','221','231'], correct:2, hint:'(10+3)(10+7) = 100+70+30+21', explanation:'13 × 17 = 221' },
  { id:'ar-22', skill:'arithmetic', difficulty:5, question:'What is √(16 × 25)?', choices:['16','18','20','22'], correct:2, hint:'√(16×25) = √16 × √25', explanation:'√400 = 20' },
  { id:'ar-23', skill:'arithmetic', difficulty:5, question:'If 2ˣ = 64, what is x?', choices:['4','5','6','7'], correct:2, hint:'2¹=2, 2²=4, 2³=8...', explanation:'2⁶ = 64, so x = 6' },
  { id:'ar-24', skill:'arithmetic', difficulty:5, question:'What is 1,000,000 ÷ 125?', choices:['7000','8000','9000','10000'], correct:1, hint:'125 = 1000/8, so divide by 1000 then multiply by 8', explanation:'1,000,000 ÷ 125 = 8,000' },
  { id:'ar-25', skill:'arithmetic', difficulty:5, question:'What is 0.1² + 0.2²?', choices:['0.03','0.05','0.08','0.09'], correct:1, hint:'0.1² = 0.01, 0.2² = 0.04', explanation:'0.01 + 0.04 = 0.05' },

  // ══════════════════════════════════════════════════════════
  // FRACTIONS — 20 questions
  // ══════════════════════════════════════════════════════════
  { id:'fr-01', skill:'fractions', difficulty:1, question:'What is 1/2 of 8?', choices:['2','3','4','5'], correct:2, hint:'Divide 8 by 2.', explanation:'1/2 of 8 = 4' },
  { id:'fr-02', skill:'fractions', difficulty:1, question:'What fraction of 12 is 3?', choices:['1/3','1/4','1/5','1/6'], correct:1, hint:'3 out of 12 = 3/12, simplify.', explanation:'3/12 = 1/4' },
  { id:'fr-03', skill:'fractions', difficulty:2, question:'What is 3/8 + 1/8?', choices:['1/4','3/8','1/2','5/8'], correct:2, hint:'Same denominator, add numerators.', explanation:'3/8 + 1/8 = 4/8 = 1/2' },
  { id:'fr-04', skill:'fractions', difficulty:2, question:'What is 5/6 - 1/6?', choices:['1/3','2/3','4/6','5/6'], correct:1, hint:'Same denominator, subtract numerators.', explanation:'5/6 - 1/6 = 4/6 = 2/3' },
  { id:'fr-05', skill:'fractions', difficulty:2, question:'Which is larger: 3/5 or 2/3?', choices:['3/5','2/3','Equal','Cannot tell'], correct:1, hint:'Convert to same denominator: 9/15 vs 10/15', explanation:'2/3 = 10/15 > 3/5 = 9/15' },
  { id:'fr-06', skill:'fractions', difficulty:2, question:'What is 1/3 + 1/6?', choices:['1/4','2/9','1/2','2/6'], correct:2, hint:'Convert 1/3 to sixths first.', explanation:'2/6 + 1/6 = 3/6 = 1/2' },
  { id:'fr-07', skill:'fractions', difficulty:3, question:'What is 3/4 - 1/3?', choices:['1/6','2/12','5/12','7/12'], correct:2, hint:'Common denominator is 12.', explanation:'9/12 - 4/12 = 5/12' },
  { id:'fr-08', skill:'fractions', difficulty:3, question:'What is 2/5 × 5/6?', choices:['1/6','1/5','1/3','2/3'], correct:2, hint:'Multiply tops and bottoms, then simplify.', explanation:'10/30 = 1/3' },
  { id:'fr-09', skill:'fractions', difficulty:3, question:'Convert 7/4 to a mixed number.', choices:['1¾','2¼','1½','3¼'], correct:0, hint:'7 ÷ 4 = 1 remainder 3.', explanation:'7/4 = 1 and 3/4 = 1¾' },
  { id:'fr-10', skill:'fractions', difficulty:3, question:'What is 2½ + 1¾?', choices:['3¾','4','4¼','4½'], correct:2, hint:'Add whole numbers, then fractions.', explanation:'2+1=3, ½+¾=5/4=1¼, total=4¼' },
  { id:'fr-11', skill:'fractions', difficulty:4, question:'What is 4/5 ÷ 2/3?', choices:['6/5','8/15','6/7','8/10'], correct:0, hint:'Flip and multiply: 4/5 × 3/2', explanation:'4/5 × 3/2 = 12/10 = 6/5' },
  { id:'fr-12', skill:'fractions', difficulty:4, question:'Simplify 36/48.', choices:['2/3','3/4','4/5','5/6'], correct:1, hint:'GCD of 36 and 48 is 12.', explanation:'36/48 = 3/4' },
  { id:'fr-13', skill:'fractions', difficulty:4, question:'What is 3¼ × 2?', choices:['6','6¼','6½','7'], correct:2, hint:'3¼ × 2 = 3×2 + ¼×2', explanation:'3¼ × 2 = 6½' },
  { id:'fr-14', skill:'fractions', difficulty:4, question:'What is 40% as a fraction in lowest terms?', choices:['2/5','4/9','40/100','8/20'], correct:0, hint:'40% = 40/100, simplify.', explanation:'40/100 = 2/5' },
  { id:'fr-15', skill:'fractions', difficulty:5, question:'What is 5/8 of 3/4?', choices:['5/32','15/32','8/12','5/6'], correct:1, hint:'Multiply: 5/8 × 3/4', explanation:'5×3 / 8×4 = 15/32' },
  { id:'fr-16', skill:'fractions', difficulty:5, question:'If 3/x = 9/15, what is x?', choices:['3','5','9','15'], correct:1, hint:'Cross multiply: 3×15 = 9×x', explanation:'45 = 9x, so x = 5' },
  { id:'fr-17', skill:'fractions', difficulty:5, question:'What is 1⅔ ÷ 2½?', choices:['2/3','4/5','3/7','5/9'], correct:0, hint:'Convert to improper: 5/3 ÷ 5/2', explanation:'5/3 × 2/5 = 10/15 = 2/3' },
  { id:'fr-18', skill:'fractions', difficulty:3, question:'What fraction is halfway between 1/4 and 3/4?', choices:['1/3','1/2','2/3','3/8'], correct:1, hint:'Halfway = average of the two.', explanation:'(1/4 + 3/4) ÷ 2 = 1 ÷ 2 = 1/2' },
  { id:'fr-19', skill:'fractions', difficulty:2, question:'What is 3/4 of 40?', choices:['20','25','30','35'], correct:2, hint:'Find 1/4 first, then multiply by 3.', explanation:'1/4 of 40 = 10, × 3 = 30' },
  { id:'fr-20', skill:'fractions', difficulty:3, question:'Express 0.75 as a fraction.', choices:['3/4','7/5','7/10','75/10'], correct:0, hint:'0.75 = 75/100, simplify.', explanation:'75/100 = 3/4' },

  // ══════════════════════════════════════════════════════════
  // LOGIC — 20 questions
  // ══════════════════════════════════════════════════════════
  { id:'lo-01', skill:'logic', difficulty:1, question:'What comes after Monday?', choices:['Sunday','Tuesday','Wednesday','Saturday'], correct:1, hint:'Days of the week in order.', explanation:'Monday → Tuesday' },
  { id:'lo-02', skill:'logic', difficulty:1, question:'If it is not raining, is it sunny?', choices:['Yes','No','Maybe','Cannot tell'], correct:2, hint:'Not raining doesn\'t mean sunny — could be cloudy.', explanation:'Maybe — it could be cloudy without rain.' },
  { id:'lo-03', skill:'logic', difficulty:2, question:'Anna is 5. Bob is 3 years older. How old is Bob?', choices:['6','7','8','9'], correct:2, hint:'5 + 3 = ?', explanation:'Bob is 5 + 3 = 8 years old.' },
  { id:'lo-04', skill:'logic', difficulty:2, question:'All birds have wings. A penguin is a bird. Does a penguin have wings?', choices:['Yes','No','Maybe','Not enough info'], correct:0, hint:'Apply the rule directly.', explanation:'Yes — all birds have wings, and penguins are birds.' },
  { id:'lo-05', skill:'logic', difficulty:2, question:'There are 5 red and 3 blue marbles. You pick one. What colour is most likely?', choices:['Red','Blue','Equal','Cannot tell'], correct:0, hint:'5 > 3, so red is more probable.', explanation:'Red (5/8 chance vs blue 3/8).' },
  { id:'lo-06', skill:'logic', difficulty:2, question:'If today is Wednesday, what day is it in 3 days?', choices:['Friday','Saturday','Sunday','Monday'], correct:1, hint:'Wed → Thu → Fri → Sat', explanation:'Wednesday + 3 = Saturday.' },
  { id:'lo-07', skill:'logic', difficulty:3, question:'I have a number. Double it, add 4, divide by 2, subtract the original number. What do you always get?', choices:['1','2','4','Depends on number'], correct:1, hint:'Try with x: (2x+4)/2 - x = ?', explanation:'(2x+4)/2 - x = x+2 - x = 2. Always 2!' },
  { id:'lo-08', skill:'logic', difficulty:3, question:'Kim is taller than Lee. Lee is taller than Pat. Who is shortest?', choices:['Kim','Lee','Pat','Cannot tell'], correct:2, hint:'Kim > Lee > Pat', explanation:'Pat is shortest in the chain Kim > Lee > Pat.' },
  { id:'lo-09', skill:'logic', difficulty:3, question:'A box contains 4 red, 3 green, 2 blue balls. What\'s the chance of picking green?', choices:['1/3','3/9','1/4','3/4'], correct:0, hint:'3 green out of 9 total.', explanation:'3/9 = 1/3' },
  { id:'lo-10', skill:'logic', difficulty:3, question:'If all squares are rectangles, is every rectangle a square?', choices:['Yes','No','Sometimes','Cannot tell'], correct:1, hint:'Squares are a special type of rectangle.', explanation:'No — rectangles need not have equal sides.' },
  { id:'lo-11', skill:'logic', difficulty:3, question:'Mia has more books than Tom. Tom has fewer than Sam. Who has the most?', choices:['Mia','Tom','Sam','Cannot tell'], correct:3, hint:'Mia > Tom and Sam > Tom, but Mia vs Sam is unknown.', explanation:'Cannot tell — we only know both Mia and Sam beat Tom.' },
  { id:'lo-12', skill:'logic', difficulty:4, question:'In a group of 30, 18 play football, 15 play basketball, 9 play both. How many play neither?', choices:['3','6','9','12'], correct:1, hint:'Use inclusion-exclusion: 18+15-9=24 play at least one.', explanation:'30 - (18+15-9) = 30 - 24 = 6' },
  { id:'lo-13', skill:'logic', difficulty:4, question:'If p → q and q → r, and p is true, what can we conclude?', choices:['r is true','r is false','p is false','Nothing'], correct:0, hint:'Chain the logic: p → q → r', explanation:'If p is true, q is true, therefore r is true.' },
  { id:'lo-14', skill:'logic', difficulty:4, question:'There are 3 boxes: one has gold, one has silver, one is empty. Labels are all wrong. You open "Empty" and find gold. Where is silver?', choices:['Empty box','Gold box','Silver box','Cannot tell'], correct:0, hint:'Since all labels are wrong, "Gold" box must have silver or be empty.', explanation:'The "Gold" box has silver (can\'t have gold), so "Silver" box is empty.' },
  { id:'lo-15', skill:'logic', difficulty:4, question:'If the probability of rain tomorrow is 0.3, what is the probability it does NOT rain?', choices:['0.3','0.6','0.7','0.9'], correct:2, hint:'P(not A) = 1 - P(A)', explanation:'1 - 0.3 = 0.7' },
  { id:'lo-16', skill:'logic', difficulty:5, question:'Of 100 people: 70 like tea, 80 like coffee, 55 like both. How many like neither?', choices:['0','5','10','15'], correct:1, hint:'|Tea ∪ Coffee| = 70+80-55 = 95', explanation:'100 - 95 = 5 people like neither.' },
  { id:'lo-17', skill:'logic', difficulty:5, question:'A statement and its contrapositive are logically equivalent. If "A→B", which is the contrapositive?', choices:['B→A','¬A→¬B','¬B→¬A','A→¬B'], correct:2, hint:'Contrapositive: flip and negate both.', explanation:'Contrapositive of A→B is ¬B→¬A.' },
  { id:'lo-18', skill:'logic', difficulty:5, question:'In a tournament, every team plays every other team once. There are 6 teams. How many games?', choices:['12','15','18','20'], correct:1, hint:'C(6,2) = 6!/(2!×4!)', explanation:'C(6,2) = 15 games.' },
  { id:'lo-19', skill:'logic', difficulty:3, question:'Five friends sit in a row. How many arrangements are possible?', choices:['25','60','120','150'], correct:2, hint:'5! = 5×4×3×2×1', explanation:'5! = 120 arrangements.' },
  { id:'lo-20', skill:'logic', difficulty:2, question:'Twice a number plus 6 equals 20. What is the number?', choices:['5','6','7','8'], correct:2, hint:'2n + 6 = 20, solve for n.', explanation:'2n = 14, n = 7.' },

  // ══════════════════════════════════════════════════════════
  // PATTERN — 20 questions
  // ══════════════════════════════════════════════════════════
  { id:'pa-01', skill:'pattern', difficulty:1, question:'Next: 5, 10, 15, 20, ___', choices:['22','24','25','30'], correct:2, hint:'Each number increases by 5.', explanation:'+5 pattern: 20+5=25' },
  { id:'pa-02', skill:'pattern', difficulty:1, question:'Next: 100, 90, 80, 70, ___', choices:['50','55','60','65'], correct:2, hint:'Each number decreases by 10.', explanation:'-10 pattern: 70-10=60' },
  { id:'pa-03', skill:'pattern', difficulty:1, question:'Next: A, C, E, G, ___', choices:['H','I','J','K'], correct:1, hint:'Skip one letter each time.', explanation:'Every other letter: A,C,E,G,I' },
  { id:'pa-04', skill:'pattern', difficulty:2, question:'Next: 2, 6, 18, 54, ___', choices:['108','162','216','270'], correct:1, hint:'Multiply by 3 each time.', explanation:'×3 pattern: 54×3=162' },
  { id:'pa-05', skill:'pattern', difficulty:2, question:'Next: 1, 4, 9, 16, ___', choices:['20','24','25','36'], correct:2, hint:'These are square numbers.', explanation:'1²,2²,3²,4²,5²=25' },
  { id:'pa-06', skill:'pattern', difficulty:2, question:'Next: 3, 6, 12, 24, ___', choices:['36','40','48','60'], correct:2, hint:'Double each time.', explanation:'×2: 24×2=48' },
  { id:'pa-07', skill:'pattern', difficulty:2, question:'Next: 1, 2, 4, 7, 11, ___', choices:['14','15','16','17'], correct:2, hint:'Differences: 1, 2, 3, 4, 5...', explanation:'Differences increase by 1: 11+5=16' },
  { id:'pa-08', skill:'pattern', difficulty:3, question:'Next: 1, 1, 2, 3, 5, 8, 13, ___', choices:['18','20','21','24'], correct:2, hint:'Each term = sum of previous two.', explanation:'Fibonacci: 8+13=21' },
  { id:'pa-09', skill:'pattern', difficulty:3, question:'What is the 8th term of: 4, 8, 12, 16...?', choices:['28','30','32','36'], correct:2, hint:'Formula: 4n', explanation:'4×8=32' },
  { id:'pa-10', skill:'pattern', difficulty:3, question:'Next: 2, 3, 5, 8, 12, 17, ___', choices:['21','22','23','25'], correct:2, hint:'Differences: 1, 2, 3, 4, 5, 6...', explanation:'17+6=23' },
  { id:'pa-11', skill:'pattern', difficulty:3, question:'What is the 10th square number?', choices:['81','90','100','110'], correct:2, hint:'n² where n=10', explanation:'10²=100' },
  { id:'pa-12', skill:'pattern', difficulty:4, question:'What is the 12th term of: 7, 12, 17, 22...?', choices:['57','60','62','64'], correct:2, hint:'Formula: 7 + (n-1)×5', explanation:'7 + 11×5 = 7+55 = 62' },
  { id:'pa-13', skill:'pattern', difficulty:4, question:'Next: 1, 8, 27, 64, ___', choices:['100','115','125','150'], correct:2, hint:'These are cube numbers.', explanation:'1³,2³,3³,4³,5³=125' },
  { id:'pa-14', skill:'pattern', difficulty:4, question:'Sum of first 10 natural numbers?', choices:['45','50','55','60'], correct:2, hint:'Formula: n(n+1)/2', explanation:'10×11/2=55' },
  { id:'pa-15', skill:'pattern', difficulty:4, question:'Next: 2, 5, 10, 17, 26, ___', choices:['35','36','37','38'], correct:2, hint:'Differences: 3, 5, 7, 9, 11...', explanation:'26+11=37' },
  { id:'pa-16', skill:'pattern', difficulty:5, question:'How many terms in: 3, 6, 9...99?', choices:['30','33','36','39'], correct:1, hint:'Last term = 3n, so n = 99/3', explanation:'99/3 = 33 terms' },
  { id:'pa-17', skill:'pattern', difficulty:5, question:'Sum of first 20 even numbers (2+4+...+40)?', choices:['380','400','420','440'], correct:2, hint:'n(n+1) where n=20', explanation:'20×21=420' },
  { id:'pa-18', skill:'pattern', difficulty:5, question:'What is the 15th triangular number?', choices:['100','105','110','120'], correct:3, hint:'n(n+1)/2 where n=15', explanation:'15×16/2=120' },
  { id:'pa-19', skill:'pattern', difficulty:3, question:'Next in: ♦♣♦♣♦♣ ___', choices:['♦','♣','♠','♥'], correct:0, hint:'Alternating pattern.', explanation:'Alternates: ♦♣♦♣... next is ♦' },
  { id:'pa-20', skill:'pattern', difficulty:2, question:'Next: 1, 3, 7, 15, 31, ___', choices:['47','55','63','75'], correct:2, hint:'Double previous, add 1.', explanation:'2×31+1=63' },

  // ══════════════════════════════════════════════════════════
  // ALGEBRA — 20 questions
  // ══════════════════════════════════════════════════════════
  { id:'alg-01', skill:'algebra', difficulty:2, question:'If y = 2x + 1, what is y when x = 3?', choices:['5','6','7','8'], correct:2, hint:'Substitute x=3.', explanation:'y = 2(3)+1 = 7' },
  { id:'alg-02', skill:'algebra', difficulty:2, question:'Solve: 4x = 20', choices:['4','5','6','7'], correct:1, hint:'Divide both sides by 4.', explanation:'x = 20÷4 = 5' },
  { id:'alg-03', skill:'algebra', difficulty:2, question:'Solve: x - 7 = 12', choices:['5','17','19','21'], correct:2, hint:'Add 7 to both sides.', explanation:'x = 12+7 = 19' },
  { id:'alg-04', skill:'algebra', difficulty:3, question:'Solve: 3x - 5 = 16', choices:['5','6','7','8'], correct:2, hint:'Add 5 first, then divide by 3.', explanation:'3x=21, x=7' },
  { id:'alg-05', skill:'algebra', difficulty:3, question:'If 5x + 3 = 28, what is x?', choices:['4','5','6','7'], correct:1, hint:'Subtract 3, divide by 5.', explanation:'5x=25, x=5' },
  { id:'alg-06', skill:'algebra', difficulty:3, question:'Simplify: 3x + 2x - x', choices:['4x','5x','6x','3x+1'], correct:0, hint:'Combine like terms.', explanation:'3x+2x-x = 4x' },
  { id:'alg-07', skill:'algebra', difficulty:3, question:'If y = x² and x = 4, what is y?', choices:['8','12','16','20'], correct:2, hint:'Substitute x=4.', explanation:'y = 4² = 16' },
  { id:'alg-08', skill:'algebra', difficulty:3, question:'Expand: 2(x + 5)', choices:['2x+5','2x+7','2x+10','x+10'], correct:2, hint:'Multiply 2 by each term.', explanation:'2×x + 2×5 = 2x+10' },
  { id:'alg-09', skill:'algebra', difficulty:4, question:'Solve: 2(x + 3) = 14', choices:['3','4','5','6'], correct:2, hint:'Expand first, then solve.', explanation:'2x+6=14, 2x=8, x=4… wait: x=4' },
  { id:'alg-10', skill:'algebra', difficulty:4, question:'If 2x + y = 10 and x = 3, what is y?', choices:['2','3','4','5'], correct:2, hint:'Substitute x=3.', explanation:'6+y=10, y=4' },
  { id:'alg-11', skill:'algebra', difficulty:4, question:'Factorise: x² + 5x + 6', choices:['(x+2)(x+3)','(x+1)(x+6)','(x+5)(x+1)','(x+3)(x+4)'], correct:0, hint:'Find two numbers that multiply to 6 and add to 5.', explanation:'2×3=6, 2+3=5: (x+2)(x+3)' },
  { id:'alg-12', skill:'algebra', difficulty:4, question:'What is the slope of y = 3x - 7?', choices:['3','7','-7','3x'], correct:0, hint:'y = mx + c, slope is m.', explanation:'Slope m = 3' },
  { id:'alg-13', skill:'algebra', difficulty:4, question:'Solve: x/4 = 7', choices:['24','28','32','11'], correct:1, hint:'Multiply both sides by 4.', explanation:'x = 7×4 = 28' },
  { id:'alg-14', skill:'algebra', difficulty:5, question:'Solve: x² - 9 = 0', choices:['x=3','x=-3','x=3 or x=-3','x=9'], correct:2, hint:'x² = 9, what are the square roots?', explanation:'x = ±3' },
  { id:'alg-15', skill:'algebra', difficulty:5, question:'If f(x) = x² - 2x, what is f(5)?', choices:['10','15','20','25'], correct:1, hint:'Substitute x=5.', explanation:'25-10=15' },
  { id:'alg-16', skill:'algebra', difficulty:5, question:'Solve the system: x+y=10, x-y=4', choices:['x=6,y=4','x=7,y=3','x=8,y=2','x=5,y=5'], correct:1, hint:'Add both equations: 2x=14', explanation:'x=7, then y=10-7=3' },
  { id:'alg-17', skill:'algebra', difficulty:5, question:'Expand: (x+3)²', choices:['x²+6','x²+9','x²+6x+9','x²+3x+9'], correct:2, hint:'(a+b)² = a²+2ab+b²', explanation:'x²+2(x)(3)+9 = x²+6x+9' },
  { id:'alg-18', skill:'algebra', difficulty:3, question:'What is the value of 2x²  when x = 3?', choices:['12','18','36','54'], correct:1, hint:'First square x, then multiply by 2.', explanation:'2×3² = 2×9 = 18' },
  { id:'alg-19', skill:'algebra', difficulty:2, question:'If n + 8 = 15, what is n?', choices:['6','7','8','9'], correct:1, hint:'Subtract 8 from both sides.', explanation:'n = 15-8 = 7' },
  { id:'alg-20', skill:'algebra', difficulty:4, question:'What is the y-intercept of y = 2x + 5?', choices:['2','4','5','10'], correct:2, hint:'y-intercept is where x=0.', explanation:'When x=0: y=5' },
]
