import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-primary">
      <h1 className="text-4xl font-bold text-primary-foreground">
        Página não encontrada
      </h1>
      <p className="text-primary-foreground">
        Voltar para o
        <Button variant="link">
          <Link to="/" className="text-primary-foreground">
            Dashboard
          </Link>
        </Button>
      </p>
    </div>
  )
}
