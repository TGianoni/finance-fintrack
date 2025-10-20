import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteTransactionForm } from '@/forms/hooks/transaction'

export const DeleteTransactionButton = ({ transaction }) => {
  const formSubmit = useDeleteTransactionForm({
    onSuccess: () => {
      toast.success('Deleção efetuava com sucesso!')
    },
    onError: () => {
      toast.error(
        'Erro ao tentar efetuar a deleção! Tente novamente mais tarde.'
      )
    },
  })
  const handleDelete = () => {
    formSubmit(transaction)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2Icon className="space-x-0 text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar esta transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta operação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit" onClick={handleDelete} className="bg-red-500">
              Deletar transação
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
