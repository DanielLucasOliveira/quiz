import { useForm } from "react-hook-form";
import styles from "../styles/Inicio.module.css";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "./ui/select";
import { useRouter } from "next/router";


const formSchema = z.object({
    username: z.string().min(3, { message: "Usuario deve ter no minimo 3 letras" }).max(30),
    dificuldade: z.string(),
});

export default function Inicio() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            dificuldade: "1",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.push({
            pathname: "/questionario",
            query: {
                username: values.username,
                dificuldade: values.dificuldade
            }
        })
    }
    return (
        <div className={styles.home}>
            <h1 className="font-bold" style={{ fontSize: "30px" }}>StudyQuiz</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-12 w-full flex flex-col">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Usuario" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dificuldade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dificuldade:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a difficulty" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1">Fácil</SelectItem>
                                        <SelectItem value="2">Normal</SelectItem>
                                        <SelectItem value="3">Dificil</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>Set the game difficulty.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={styles.button}>
                        Jogar
                    </Button>
                </form>
            </Form>
        </div>
    );
}
