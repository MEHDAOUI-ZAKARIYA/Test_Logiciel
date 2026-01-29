// === Logique métier ===
// Logique de calcul (opérations arithmétiques)
// Ces fonctions représentent les 4 opérations de base d’une calculatrice.
// La division inclut une gestion d’erreur : si le dénominateur est 0,
// elle retourne la chaîne 'Erreur' au lieu de provoquer une exception ou un Infinity.
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return b !== 0 ? a / b : 'Erreur'; }
// Règle métier : validation de l’email professionnel
// s’assurer que l’utilisateur fournit un email professionnel appartenant àl’entreprise.
// Critère : l’email doit se terminer exactement par @company.com.
// Retourne true uniquement si :
// L’email n’est pas vide (email est truthy),
// Et il se termine par @company.com.
    function isValidCorporateEmail(email) {
    return email && email.endsWith('@company.com');
}
// Affichage dynamique du statut email
// Met à jour en temps réel le message de feedback sous le champ email.
// Trois états possibles :
// 1- Vide → aucun message (champ non rempli).
// 2- Valide → message vert "Email valide".
// 3- Invalide → message rouge avec instruction claire.
function updateEmailStatus(email) {
    const el = document.getElementById('email-status');
    if (!email) {
        el.textContent = '';
    } else if (isValidCorporateEmail(email)) {
        el.textContent = 'Email valide';
        el.style.color = 'green';
    } else {
        el.textContent = 'Doit se terminer par @company.com';
        el.style.color = 'red';
    }
}
// Contrôle d’accès aux calculs
// Règle métier :
// Si aucun email n’est saisi → calcul autorisé (mode invité temporaire).
// Si email valide (*@company.com) → calcul autorisé.
// Si email invalide → calcul interdit.

function isCalculationAllowed() {
    const email = document.getElementById('input-email').value;
    return !email || isValidCorporateEmail(email);
}
// Affichage dynamique du resultat
function displayResult(value) {
    document.getElementById('output').textContent = value;
}
// === Écouteurs ===
// Comportement des boutons (écouteurs d’événements)
// À chaque frappe, le statut email est mis à jour.
document.getElementById('input-email').addEventListener('input', (e) => {
    updateEmailStatus(e.target.value);
});
// Bouton "Addition"
// Applique la règle métier : bloque le calcul si email invalide.
document.getElementById('btn-add').addEventListener('click', () => {
    if (!isCalculationAllowed()) {
        displayResult('Erreur: Email invalide');
        return;
    }
    const a = parseFloat(document.getElementById('input-a').value) || 0;
    const b = parseFloat(document.getElementById('input-b').value) || 0;
    displayResult(add(a, b));
});
// Autres opérations (−, ×, ÷)
// Ne bloquent pas sur l’email → calcul toujours autorisé.
['sub', 'mul', 'div'].forEach(op => {
    document.getElementById(`btn-${op}`).addEventListener('click', () => {
        const a = parseFloat(document.getElementById('input-a').value) || 0;
        const b = parseFloat(document.getElementById('input-b').value) || 0;
        let result;
        switch(op) {
            case 'sub': result = sub(a, b); break;
            case 'mul': result = mul(a, b); break;
            case 'div': result = div(a, b); break;
        }
        displayResult(result);
    });
});