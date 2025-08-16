# Sistema di Notifiche per Servizi in Scadenza

## Panoramica

Questo sistema notifica automaticamente l'utente quando i servizi dei veicoli stanno per scadere (entro una settimana) o sono già scaduti.

## Funzionalità

### 🔔 Icona Campanella

- **Posizione**: Topbar, accanto al pulsante utente
- **Badge**: Mostra il numero di servizi in scadenza
- **Colore**: Rosso per attirare l'attenzione

### 📋 Dropdown Dettagliato

Cliccando sulla campanella si apre un menu che mostra:

#### Header

- Titolo: "Servizi in scadenza"
- Sottotitolo: Conteggio dei servizi da controllare

#### Lista Servizi

Per ogni servizio in scadenza:

- **Icona**:
  - ⚠️ Warning (rosso) per servizi scaduti
  - ⏰ Schedule (giallo) per servizi in scadenza
- **Nome del servizio**
- **Veicolo**: Nome e tipo
- **Officina**: Nome dell'officina
- **Stato scadenza**:
  - "Scade tra X giorni" (blu per >3 giorni, giallo per ≤3 giorni)
  - "Scaduto da X giorni" (rosso)

## Implementazione Tecnica

### Database

- **Tabella**: `services`
- **Campo chiave**: `expiredAt` (data di scadenza)
- **Filtro**: Servizi che scadono entro 7 giorni dalla data corrente

### API Endpoints

- **GET** `/api/services/expiring` - Recupera servizi in scadenza
- **Action**: `getExpiringServices()` in `maintenance/actions.tsx`

### Componenti

- **NotificationBell**: Componente principale con icona e dropdown
- **Integrazione**: Aggiunto alla Topbar esistente

### Aggiornamenti Automatici

- **Frequenza**: Ogni ora
- **Trigger**: useEffect con setInterval
- **Cleanup**: Rimozione dell'interval al dismount del componente

## Logica di Business

### Calcolo Scadenza

```typescript
const getDaysUntilExpiry = (expiredAt: string) => {
  const expiryDate = parseISO(expiredAt);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
```

### Colori per Urgenza

- **Rosso** (`error.main`): Servizio scaduto
- **Giallo** (`warning.main`): Scade entro 3 giorni
- **Blu** (`info.main`): Scade tra 4-7 giorni

### Filtri Applicati

1. `expiredAt` non null
2. `vehicle` non null
3. `garage` non null
4. Scadenza entro 7 giorni

## Utilizzo

### Per l'Utente

1. Guarda la campanella nella topbar
2. Se c'è un numero rosso, clicca per vedere i dettagli
3. Controlla i servizi in scadenza
4. Pianifica le manutenzioni necessarie

### Per gli Sviluppatori

1. **Aggiungere notifiche**: Modificare `getExpiringServices()`
2. **Personalizzare UI**: Modificare `NotificationBell.tsx`
3. **Cambiare logica**: Aggiornare la funzione di calcolo giorni

## Configurazione

### Intervallo di Aggiornamento

```typescript
// Refresh every hour
const interval = setInterval(fetchExpiringServices, 60 * 60 * 1000);
```

### Soglia di Scadenza

```typescript
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
```

## Dipendenze

- **@mui/material**: Componenti UI
- **@mui/icons-material**: Icone
- **date-fns**: Parsing e manipolazione date
- **React hooks**: useState, useEffect

## Note di Sicurezza

- Le notifiche sono specifiche per utente (filtro per `userId`)
- Solo servizi non cancellati (`deletedAt` null)
- Validazione dei dati prima della visualizzazione
