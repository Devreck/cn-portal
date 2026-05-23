-- ============================================================
-- LIMPEZA DE ELEMENTOS VISUAIS INVALIDOS
-- Remove cards vazios, principalmente equacao_quimica sem equacao.
-- ============================================================

create or replace function public.cn_limpar_elementos_visuais_invalidos(valor jsonb)
returns jsonb
language sql
immutable
as $$
  select coalesce(
    jsonb_agg(elem),
    '[]'::jsonb
  )
  from jsonb_array_elements(coalesce(valor, '[]'::jsonb)) elem
  where
    elem ? 'tipo'
    and (
      elem->>'tipo' <> 'equacao_quimica'
      or length(trim(coalesce(elem->>'equacao', ''))) > 0
    )
    and (
      elem->>'tipo' <> 'tabela'
      or jsonb_typeof(elem->'linhas') = 'array'
    )
    and (
      elem->>'tipo' <> 'grafico_xy'
      or jsonb_typeof(elem->'series') = 'array'
    )
    and (
      elem->>'tipo' <> 'circuito_serie'
      or jsonb_typeof(elem->'componentes') = 'array'
    )
    and (
      elem->>'tipo' <> 'heredograma'
      or jsonb_typeof(elem->'geracoes') = 'array'
    );
$$;

update public.questoes_banco
set
  elementos_visuais = public.cn_limpar_elementos_visuais_invalidos(elementos_visuais),
  texto_base = case
    when texto_base ? 'elementos_visuais'
      then jsonb_set(texto_base, '{elementos_visuais}', '[]'::jsonb, true)
    else texto_base
  end
where elementos_visuais is not null
   or texto_base ? 'elementos_visuais';
