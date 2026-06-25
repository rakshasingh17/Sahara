// src/pages/LegacyVault.jsx
// Financial asset tracker — helps families document all assets after losing a loved one.
// Rebuilt in English from the original Marathi HTML file, styled to match Sahara's design.

import { useState } from 'react'
import { Landmark, TrendingUp, Shield, Home, Plus, Trash2, ChevronRight, FileText, AlertTriangle } from 'lucide-react'

// ── Helpers ────────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 8)

const TABS = [
  { key: 'bank',    label: 'Bank Accounts', icon: Landmark,   color: 'green' },
  { key: 'invest',  label: 'Investments',   icon: TrendingUp, color: 'blue'  },
  { key: 'insure',  label: 'Insurance',     icon: Shield,     color: 'amber' },
  { key: 'property',label: 'Property',      icon: Home,       color: 'red'   },
  { key: 'docs',    label: 'Document Guide',icon: FileText,   color: 'gray'  },
]

const COLOR = {
  green: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', tab: 'border-emerald-600 text-emerald-700', dot: 'bg-emerald-500' },
  blue:  { badge: 'bg-blue-50 text-blue-700 border-blue-200',          tab: 'border-blue-600 text-blue-700',       dot: 'bg-blue-500'   },
  amber: { badge: 'bg-amber-50 text-amber-700 border-amber-200',        tab: 'border-amber-600 text-amber-700',     dot: 'bg-amber-500'  },
  red:   { badge: 'bg-rose-50 text-rose-700 border-rose-200',           tab: 'border-rose-600 text-rose-700',       dot: 'bg-rose-500'   },
  gray:  { badge: 'bg-gray-100 text-gray-600 border-gray-200',          tab: 'border-gray-500 text-gray-600',       dot: 'bg-gray-400'   },
}

// ── Default entries ────────────────────────────────────────────────────────────

const defaultBank = () => ({
  id: uid(), bankName: '', accountType: 'Savings', accountNumber: '', ifsc: '', branch: '', nomineeRegistered: 'Yes',
})
const defaultInvest = () => ({
  id: uid(), type: 'Mutual Fund', platform: '', folioNumber: '', approxValue: '', loginEmail: '', nomineeRegistered: 'Yes',
})
const defaultInsure = () => ({
  id: uid(), type: 'Life Insurance', company: '', policyNumber: '', sumAssured: '', premiumDue: '', agentContact: '',
})
const defaultProperty = () => ({
  id: uid(), type: 'Residential Property', approxValue: '', address: '',
})

// ── Field component ────────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors w-full"

// ── Asset Card wrapper ─────────────────────────────────────────────────────────

function AssetCard({ label, color, onRemove, children }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 mb-3 relative">
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${COLOR[color].badge}`}>{label}</span>
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
        >
          <Trash2 size={12} /> Remove
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  )
}

// ── BANK SECTION ───────────────────────────────────────────────────────────────

function BankSection({ items, setItems }) {
  const update = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  const remove = (id) => items.length > 1 && setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">Record all bank accounts, fixed deposits, and recurring deposits held by the deceased.</p>
      {items.map(item => (
        <AssetCard key={item.id} label="Bank Account" color="green" onRemove={() => remove(item.id)}>
          <Field label="Bank Name">
            <input className={inputCls} placeholder="e.g. HDFC Bank" value={item.bankName} onChange={e => update(item.id, 'bankName', e.target.value)} />
          </Field>
          <Field label="Account Type">
            <select className={inputCls} value={item.accountType} onChange={e => update(item.id, 'accountType', e.target.value)}>
              {['Savings', 'Current', 'Fixed Deposit', 'Recurring Deposit'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Account Number">
            <input className={inputCls} placeholder="Account number" value={item.accountNumber} onChange={e => update(item.id, 'accountNumber', e.target.value)} />
          </Field>
          <Field label="IFSC Code">
            <input className={inputCls} placeholder="IFSC Code" value={item.ifsc} onChange={e => update(item.id, 'ifsc', e.target.value)} />
          </Field>
          <Field label="Branch">
            <input className={inputCls} placeholder="Branch name & city" value={item.branch} onChange={e => update(item.id, 'branch', e.target.value)} />
          </Field>
          <Field label="Nominee Registered?">
            <select className={inputCls} value={item.nomineeRegistered} onChange={e => update(item.id, 'nomineeRegistered', e.target.value)}>
              {['Yes', 'No', 'Not Sure'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </AssetCard>
      ))}
      <button onClick={() => setItems(prev => [...prev, defaultBank()])}
        className="flex items-center gap-2 text-sm text-emerald-700 border border-dashed border-emerald-300 rounded-xl px-4 py-3 w-full justify-center hover:bg-emerald-50 transition-colors mt-2">
        <Plus size={15} /> Add Another Bank Account
      </button>
    </div>
  )
}

// ── INVESTMENT SECTION ─────────────────────────────────────────────────────────

function InvestSection({ items, setItems }) {
  const update = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  const remove = (id) => items.length > 1 && setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">Document mutual funds, shares, EPF, PPF, NPS, and other investment holdings.</p>
      {items.map(item => (
        <AssetCard key={item.id} label="Investment" color="blue" onRemove={() => remove(item.id)}>
          <Field label="Investment Type">
            <select className={inputCls} value={item.type} onChange={e => update(item.id, 'type', e.target.value)}>
              {['Mutual Fund', 'Shares / Equity', 'NPS', 'PPF', 'EPF', 'Bonds', 'Demat Account'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Platform / AMC">
            <input className={inputCls} placeholder="e.g. Groww, Zerodha, SBI MF" value={item.platform} onChange={e => update(item.id, 'platform', e.target.value)} />
          </Field>
          <Field label="Folio / Account Number">
            <input className={inputCls} placeholder="Folio or account number" value={item.folioNumber} onChange={e => update(item.id, 'folioNumber', e.target.value)} />
          </Field>
          <Field label="Approximate Value (₹)">
            <input className={inputCls} placeholder="e.g. 1,00,000" value={item.approxValue} onChange={e => update(item.id, 'approxValue', e.target.value)} />
          </Field>
          <Field label="Registered Email">
            <input className={inputCls} placeholder="Email used to login" value={item.loginEmail} onChange={e => update(item.id, 'loginEmail', e.target.value)} />
          </Field>
          <Field label="Nominee Registered?">
            <select className={inputCls} value={item.nomineeRegistered} onChange={e => update(item.id, 'nomineeRegistered', e.target.value)}>
              {['Yes', 'No', 'Not Sure'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </AssetCard>
      ))}
      <button onClick={() => setItems(prev => [...prev, defaultInvest()])}
        className="flex items-center gap-2 text-sm text-blue-700 border border-dashed border-blue-300 rounded-xl px-4 py-3 w-full justify-center hover:bg-blue-50 transition-colors mt-2">
        <Plus size={15} /> Add Another Investment
      </button>
    </div>
  )
}

// ── INSURANCE SECTION ──────────────────────────────────────────────────────────

function InsureSection({ items, setItems }) {
  const update = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  const remove = (id) => items.length > 1 && setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">Record all life, term, health, and vehicle insurance policies.</p>
      {items.map(item => (
        <AssetCard key={item.id} label="Insurance Policy" color="amber" onRemove={() => remove(item.id)}>
          <Field label="Insurance Type">
            <select className={inputCls} value={item.type} onChange={e => update(item.id, 'type', e.target.value)}>
              {['Life Insurance', 'Term Insurance', 'Health / Mediclaim', 'ULIP', 'Vehicle Insurance'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Company Name">
            <input className={inputCls} placeholder="e.g. LIC, HDFC Life" value={item.company} onChange={e => update(item.id, 'company', e.target.value)} />
          </Field>
          <Field label="Policy Number">
            <input className={inputCls} placeholder="Policy number" value={item.policyNumber} onChange={e => update(item.id, 'policyNumber', e.target.value)} />
          </Field>
          <Field label="Sum Assured (₹)">
            <input className={inputCls} placeholder="e.g. 50,00,000" value={item.sumAssured} onChange={e => update(item.id, 'sumAssured', e.target.value)} />
          </Field>
          <Field label="Premium Due Date">
            <input className={inputCls} type="month" value={item.premiumDue} onChange={e => update(item.id, 'premiumDue', e.target.value)} />
          </Field>
          <Field label="Agent Contact">
            <input className={inputCls} placeholder="Agent name & phone" value={item.agentContact} onChange={e => update(item.id, 'agentContact', e.target.value)} />
          </Field>
        </AssetCard>
      ))}
      <button onClick={() => setItems(prev => [...prev, defaultInsure()])}
        className="flex items-center gap-2 text-sm text-amber-700 border border-dashed border-amber-300 rounded-xl px-4 py-3 w-full justify-center hover:bg-amber-50 transition-colors mt-2">
        <Plus size={15} /> Add Another Policy
      </button>
    </div>
  )
}

// ── PROPERTY SECTION ───────────────────────────────────────────────────────────

function PropertySection({ items, setItems }) {
  const update = (id, field, val) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  const remove = (id) => items.length > 1 && setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">List all physical assets including property, vehicles, gold, and other valuables.</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex gap-3">
        <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-amber-700">Always consult a legal advocate for property transfers. The process varies by state.</p>
      </div>

      {/* Transfer guidance steps */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">How to transfer property</p>
        {[
          { n: '1', title: 'If there is a Will — Probate', desc: 'File a Probate Application in the High Court. Once the Will is validated by the court, apply for property mutation at the Sub-Registrar office.' },
          { n: '2', title: 'If there is no Will', desc: 'Obtain a Legal Heir Certificate from the Tehsildar or Court. Then apply for a Succession Certificate. Submit a mutation application at the Sub-Registrar with NOC from all legal heirs.' },
          { n: '3', title: 'If there is a Home Loan', desc: 'Notify the bank immediately. If a loan insurance policy exists, file an insurance claim. The nominee may continue EMI payments or arrange for prepayment.' },
        ].map(step => (
          <div key={step.n} className="flex gap-3 mb-3 last:mb-0">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step.n}</div>
            <div>
              <p className="text-sm font-medium text-gray-800">{step.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {items.map(item => (
        <AssetCard key={item.id} label="Asset" color="red" onRemove={() => remove(item.id)}>
          <Field label="Asset Type">
            <select className={inputCls} value={item.type} onChange={e => update(item.id, 'type', e.target.value)}>
              {['Residential Property', 'Commercial Property', 'Agricultural Land', 'Vehicle', 'Gold / Silver', 'Fixed Deposit', 'Other'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Approximate Value (₹)">
            <input className={inputCls} placeholder="e.g. 50,00,000" value={item.approxValue} onChange={e => update(item.id, 'approxValue', e.target.value)} />
          </Field>
          <div className="col-span-2">
            <Field label="Address / Details">
              <input className={inputCls} placeholder="Property address or description" value={item.address} onChange={e => update(item.id, 'address', e.target.value)} />
            </Field>
          </div>
        </AssetCard>
      ))}
      <button onClick={() => setItems(prev => [...prev, defaultProperty()])}
        className="flex items-center gap-2 text-sm text-rose-700 border border-dashed border-rose-300 rounded-xl px-4 py-3 w-full justify-center hover:bg-rose-50 transition-colors mt-2">
        <Plus size={15} /> Add Another Asset
      </button>
    </div>
  )
}

// ── DOCUMENT GUIDE ─────────────────────────────────────────────────────────────

function DocsSection() {
  const rows = [
    { task: 'Death Certificate',   docs: 'Hospital certificate, Aadhaar, Proof of residence' },
    { task: 'Bank Claim',          docs: 'Death Certificate, Nominee KYC, Claim Form, Passbook' },
    { task: 'LIC / Insurance',     docs: 'Death Certificate, Policy Bond, Nominee KYC, Claim Form' },
    { task: 'Mutual Fund Transfer',docs: 'Death Certificate, Nominee KYC, Folio Number, Transmission Form' },
    { task: 'Property Mutation',   docs: 'Death Certificate, Will / Succession Certificate, NOC, Photo ID' },
    { task: 'Vehicle Transfer',    docs: 'Death Certificate, RC Book, Insurance, NOC, Legal Heir Certificate' },
    { task: 'EPF Claim',           docs: 'Death Certificate, Form 20, Nominee KYC, Bank Details' },
  ]

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">A quick reference for which documents are needed for each process.</p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Task</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Required Documents</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{row.task}</td>
                <td className="px-4 py-3 text-gray-600">{row.docs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────

export default function LegacyVault() {
  const [activeTab, setActiveTab] = useState('bank')
  const [bankItems,     setBankItems]     = useState([defaultBank()])
  const [investItems,   setInvestItems]   = useState([defaultInvest()])
  const [insureItems,   setInsureItems]   = useState([defaultInsure()])
  const [propertyItems, setPropertyItems] = useState([defaultProperty()])

  const counts = {
    bank: bankItems.length, invest: investItems.length,
    insure: insureItems.length, property: propertyItems.length, docs: null,
  }

  const active = TABS.find(t => t.key === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span>Finance & Bank Accounts</span>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">LegacyVault</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">LegacyVault</h1>
          <p className="text-sm text-gray-500 mt-1">Document all financial assets so nothing is missed during the settlement process.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {TABS.filter(t => t.key !== 'docs').map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`bg-white border rounded-xl p-4 text-left hover:shadow-sm transition-all ${activeTab === tab.key ? `border-${tab.color === 'green' ? 'emerald' : tab.color}-300 shadow-sm` : 'border-gray-200'}`}>
                <Icon size={18} className={`mb-2 ${tab.color === 'green' ? 'text-emerald-600' : tab.color === 'blue' ? 'text-blue-600' : tab.color === 'amber' ? 'text-amber-600' : 'text-rose-600'}`} />
                <p className="text-xl font-semibold text-gray-900">{counts[tab.key]}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tab.label}</p>
              </button>
            )
          })}
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center
                  ${activeTab === tab.key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
                <Icon size={14} />
                {tab.label}
                {counts[tab.key] && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {counts[tab.key]}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">{active.label}</h2>
          {activeTab === 'bank'     && <BankSection     items={bankItems}     setItems={setBankItems}     />}
          {activeTab === 'invest'   && <InvestSection   items={investItems}   setItems={setInvestItems}   />}
          {activeTab === 'insure'   && <InsureSection   items={insureItems}   setItems={setInsureItems}   />}
          {activeTab === 'property' && <PropertySection items={propertyItems} setItems={setPropertyItems} />}
          {activeTab === 'docs'     && <DocsSection />}
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          This information is stored locally in your session. Please keep a secure offline copy of important details.
        </p>
      </div>
    </div>
  )
}
