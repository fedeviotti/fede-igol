# Linee Guida per i Commit - Conventional Commits

Questo progetto segue le specifiche dei [Conventional Commits](https://www.conventionalcommits.org/) per garantire una cronologia dei commit chiara e consistente.

## Formato Base

```
<tipo>[scope opzionale]: <descrizione>

[corpo opzionale]

[piè di pagina opzionale]
```

## Tipi di Commit

### Tipi Principali
- **feat**: Una nuova funzionalità per l'utente
- **fix**: Correzione di un bug
- **docs**: Modifiche alla documentazione
- **style**: Modifiche che non influenzano il significato del codice (spazi bianchi, formattazione, ecc.)
- **refactor**: Modifica del codice che non corregge un bug né aggiunge una funzionalità
- **test**: Aggiunta di test mancanti o correzione di test esistenti
- **chore**: Modifiche al processo di build o strumenti ausiliari e librerie

### Tipi Aggiuntivi
- **perf**: Modifica del codice che migliora le prestazioni
- **ci**: Modifiche ai file di configurazione CI e script
- **build**: Modifiche che influenzano il sistema di build o le dipendenze esterne
- **revert**: Annulla un commit precedente

## Scope (Ambito)

Gli scope aiutano a identificare quale parte del progetto è stata modificata:

### Per questo progetto:
- **ui**: Componenti dell'interfaccia utente
- **api**: Route API e endpoint
- **db**: Database, schema, migrazioni
- **auth**: Autenticazione e autorizzazione
- **maintenance**: Funzionalità di manutenzione veicoli
- **dashboard**: Dashboard e componenti correlati
- **profile**: Profilo utente
- **settings**: Impostazioni
- **utils**: Utility e helper
- **config**: File di configurazione
- **deps**: Dipendenze e package

## Esempi Pratici

### Commit di Feature
```
feat(maintenance): aggiunge modal per aggiungere nuovo garage

- Implementa AddGarageButtonModal component
- Aggiunge validazione form per i dati garage
- Integra con API per la creazione garage
```

### Commit di Fix
```
fix(api): corregge errore nella validazione dei servizi scaduti

Risolve il problema dove i servizi con data di scadenza null
causavano errore 500 nell'endpoint /api/services/expiring
```

### Commit di Refactor
```
refactor(ui): estrae logica condivisa dei data grid

- Crea hook personalizzato useDataGridState
- Riduce duplicazione tra VehiclesDataGrid e ServicesDataGrid
- Migliora type safety per le props dei componenti
```

### Commit di Documentazione
```
docs: aggiunge linee guida per i conventional commits

Documenta gli standard per i messaggi di commit
e fornisce esempi specifici per il progetto
```

### Commit di Configurazione
```
chore(config): aggiorna configurazione ESLint

- Aggiunge regole per Next.js 14
- Configura TypeScript strict mode
- Abilita import sorting automatico
```

## Breaking Changes

Per modifiche che rompono la compatibilità, aggiungi `!` dopo il tipo/scope:

```
feat(api)!: modifica formato risposta API veicoli

BREAKING CHANGE: La struttura della risposta dell'endpoint
/api/vehicles ora restituisce un array invece di un oggetto.
Aggiornare tutti i client che utilizzano questo endpoint.
```

## Regole per la Descrizione

1. **Usa l'imperativo**: "aggiunge" non "aggiunto" o "aggiunge"
2. **Non iniziare con maiuscola**: "aggiunge feature" non "Aggiunge feature"
3. **Non terminare con un punto**: "aggiunge feature" non "aggiunge feature."
4. **Mantieni sotto i 50 caratteri** per la prima riga
5. **Usa l'italiano** per coerenza con il team

## Corpo del Commit

Se necessario, aggiungi ulteriori dettagli nel corpo:

- Spiega il **perché** non il **cosa**
- Riferisci issue o ticket correlati
- Menziona effetti collaterali o considerazioni
- Separa la descrizione dal corpo con una riga vuota

## Piè di Pagina

Usa il piè di pagina per:

- **Breaking changes**: `BREAKING CHANGE: <descrizione>`
- **Issue references**: `Closes #123` o `Fixes #456`
- **Co-authored-by**: Per commit collaborativi

## Hook Git (Opzionale)

Per automatizzare la validazione, puoi aggiungere questo hook in `.git/hooks/commit-msg`:

```bash
#!/bin/sh
commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Formato commit non valido!"
    echo "Usa: <tipo>[scope]: <descrizione>"
    echo "Esempio: feat(ui): aggiunge componente button"
    exit 1
fi
```

## Tools Consigliati

- **commitizen**: CLI per creare commit conformi
- **commitlint**: Validazione automatica dei messaggi
- **conventional-changelog**: Generazione automatica del changelog

```bash
npm install -g commitizen cz-conventional-changelog
npm install -D @commitlint/cli @commitlint/config-conventional
```

## Esempi Specifici per Questo Progetto

```bash
# Nuova funzionalità
feat(maintenance): implementa filtro per servizi scaduti

# Correzione bug
fix(db): risolve migrazione schema veicoli

# Miglioramento UI
feat(ui): aggiunge dark mode toggle

# Aggiornamento dipendenze
chore(deps): aggiorna Next.js alla versione 14.2

# Refactoring
refactor(api): estrae validatori comuni per route

# Test
test(maintenance): aggiunge test per AddVehicleModal

# Documentazione
docs(readme): aggiorna istruzioni di setup
```

## Risorse

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Commitizen](https://github.com/commitizen/cz-cli)
