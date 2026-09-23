import { requireAdmin } from '@/admin/guard';
import { InstrumentEditor } from '@/admin/actions';

interface Row {
  id: string;
  symbol: string;
  display_name: string;
  kind: string;
  contract_size: number;
  point_size: number;
  quote_currency: string;
  min_lot: number;
  lot_step: number;
}

export default async function Instruments() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from('instruments')
    .select('id, symbol, display_name, kind, contract_size, point_size, quote_currency, min_lot, lot_step')
    .is('user_id', null)
    .order('kind')
    .order('symbol');
  const rows = (data ?? []) as Row[];

  return (
    <>
      <h1 className="console-title">Instruments</h1>
      <p className="hint">
        The shipped catalogue every student starts from. Contract size × point size is the money one point is worth
        on one lot, in the quote currency — a wrong figure here makes every position size wrong. Students can still
        override any instrument to match their own broker.
      </p>
      <table className="table">
        <thead>
          <tr><th>Symbol</th><th>Name</th><th>Kind</th><th>Quote</th><th>Contract size</th><th>Point size</th><th>Min lot</th><th>Lot step</th><th /></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="num">{r.symbol}</td>
              <td>{r.display_name}</td>
              <td>{r.kind}</td>
              <td className="num">{r.quote_currency}</td>
              <InstrumentEditor
                id={r.id}
                contractSize={Number(r.contract_size)}
                pointSize={Number(r.point_size)}
                minLot={Number(r.min_lot)}
                lotStep={Number(r.lot_step)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
