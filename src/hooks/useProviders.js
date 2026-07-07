import { useEffect, useState } from 'react'
import { PROVIDERS as STATIC_PROVIDERS } from '../data/providers.js'
import { supabase } from '../lib/supabase.js'

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory || '',
    location: row.location,
    tier: row.tier || 'free',
    rating: row.rating ?? 0,
    reviews: row.reviews ?? 0,
    priceFrom: row.price_from ?? 0,
    priceUnit: row.price_unit || '',
    verified: Boolean(row.verified),
    bio: row.bio || '',
    tags: row.tags || [],
  }
}

let cache = null

export function useProviders() {
  const [dynamicProviders, setDynamicProviders] = useState(cache || [])
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache || !supabase) {
      setLoading(false)
      return
    }
    supabase
      .from('providers')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          cache = data.map(mapRow)
          setDynamicProviders(cache)
        }
        setLoading(false)
      })
  }, [])

  return { providers: [...dynamicProviders, ...STATIC_PROVIDERS], loading }
}

export function invalidateProvidersCache() {
  cache = null
}
