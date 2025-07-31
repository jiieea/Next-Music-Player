import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const Local = () => {
    return (
        <Table className="mt-3">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-white text-semibold text-2xl">Invoice</TableHead>
                    <TableHead className="text-white text-semibold text-2xl">Status</TableHead>
                    <TableHead className="text-white font-semibold text-2xl">Method</TableHead>
                    <TableHead className="text-right text-white text-semibold text-2xl">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}


export default Local;