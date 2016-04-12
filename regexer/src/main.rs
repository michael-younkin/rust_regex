use std::env;
use std::process::exit;
use std::io::{Write, stderr};
extern crate regex;
use regex::Regex;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() == 1 {
        println!("USAGE: regexer REGEX");
        exit(1);
    }
    let regexp = match Regex::new(args.get(1).expect("Regexp argument.")) {
        Ok(r) => r,
        Err(e) => {
            writeln!(&mut stderr(), "{}", e).unwrap();
            exit(2);
        }
    };
    for s in args.iter().skip(2) {
        if regexp.is_match(s) {
            println!("match");
        } else {
            println!("nomatch");
        }
    }
}
